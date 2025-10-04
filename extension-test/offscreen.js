

// ============================================
// offscreen.js - COMPLETE VERSION
// ============================================

import { pipeline, env } from './vendor/transformers.min.js';

console.log("[Offscreen] Script starting...");

// Configure transformers environment
env.allowRemoteModels = true;
env.allowLocalModels = false;

let model = null;
let isInitializing = false;
let initPromise = null;

// Initialize Gemma model
async function initModel() {
  if (model) {
    console.log("[Offscreen] Model already loaded");
    return;
  }
  
  if (isInitializing) {
    console.log("[Offscreen] Already initializing, waiting...");
    return initPromise;
  }
  
  isInitializing = true;
  console.log("[Offscreen] Initializing Gemma 3 270M ONNX model...");
  
  initPromise = (async () => {
    try {
      // Send progress updates
      const progressCallback = (progress) => {
        console.log("[Offscreen] Progress:", progress);
        chrome.runtime.sendMessage({
          type: "MODEL_PROGRESS",
          progress: {
            progress: progress.progress || 0,
            status: progress.status || 'Loading...',
            file: progress.file || ''
          }
        }).catch(() => {
          // Ignore if no listeners
        });
      };

      model = await pipeline(
        'text-generation',
        'onnx-community/gemma-3-270m-it-ONNX',
        {
          progress_callback: progressCallback,
          dtype: "fp32",
          device: 'wasm',
        }
      );

      console.log("[Offscreen] ✅ Gemma 3 270M loaded successfully!");
      
      chrome.runtime.sendMessage({
        type: "MODEL_PROGRESS",
        progress: {
          progress: 100,
          status: 'Model loaded!',
          file: ''
        }
      }).catch(() => {});
      
    } catch (err) {
      console.error("[Offscreen] ❌ Init error:", err);
      throw err;
    } finally {
      isInitializing = false;
    }
  })();
  
  return initPromise;
}

// Generate definition
async function generateDefinition(text) {
  if (!model) {
    await initModel();
  }
  
  console.log("[Offscreen] Generating definition for:", text);
  
  try {
    const prompt = `Define the following in 2-3 clear sentences: "${text}"`;
    
    const messages = [
      { role: 'user', content: prompt }
    ];
    
    const result = await model(messages, {
      max_new_tokens: 150,
      do_sample: false,
      temperature: 0.7,
    });
    
    console.log("[Offscreen] Raw result:", result);
    
    // Extract the assistant's response
    let response = '';
    if (result && result[0] && result[0].generated_text) {
      const generatedText = result[0].generated_text;
      if (Array.isArray(generatedText)) {
        const lastMessage = generatedText[generatedText.length - 1];
        response = lastMessage.content || lastMessage;
      } else {
        response = generatedText;
      }
    }
    
    console.log("[Offscreen] Response:", response);
    return response || "Sorry, I couldn't generate a definition.";
    
  } catch (err) {
    console.error("[Offscreen] Generation error:", err);
    throw err;
  }
}

// Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("[Offscreen] Received message:", msg.type);

  if (msg.type === "INIT_MODEL") {
    initModel()
      .then(() => sendResponse({ success: true }))
      .catch(err => sendResponse({ error: err.message }));
    return true; // Keep channel open
  }

  if (msg.type === "GENERATE_TEXT") {
    generateDefinition(msg.text)
      .then(response => sendResponse({ response }))
      .catch(err => sendResponse({ error: err.message }));
    return true; // Keep channel open
  }
});

// Auto-initialize on load
console.log("[Offscreen] Starting auto-initialization...");
initModel().catch(err => {
  console.error("[Offscreen] Auto-init failed:", err);
});

chrome.runtime.sendMessage({ type: "OFFSCREEN_READY" })