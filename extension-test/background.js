import { FilesetResolver, LlmInference } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@latest";

let llmInference;

async function initGemma() {
  const genai = await FilesetResolver.forGenAiTasks(
    chrome.runtime.getURL("assets/wasm")
  );

  llmInference = await LlmInference.createFromOptions(genai, {
    baseOptions: {
      modelAssetPath: chrome.runtime.getURL(
        "assets/gemma-3n-E4B-it-int4-Web.litertlm"
      ),
    },
    maxTokens: 200,
    topK: 40,
    temperature: 0.8,
  });

  console.log("✅ Gemma model loaded.");
}

await initGemma();

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "gemmaPopup",
    title: "Ask Gemma about: \"%s\"",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "gemmaPopup" && llmInference) {
    const text = info.selectionText;
    const response = await llmInference.generateResponse(text);
    chrome.tabs.sendMessage(tab.id, { selectedText: text, response });
  }
});

// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Gemma Inline Assistant installed!");
// });