// ============================================
// background.js - FINAL VERSION
// ============================================

// A promise that resolves when the offscreen document is ready.
let offscreenDocumentPromise = null;

// Create and wait for the offscreen document to be ready.
async function createOffscreenDocument() {
  if (offscreenDocumentPromise) {
    return offscreenDocumentPromise;
  }
  offscreenDocumentPromise = new Promise(async (resolve, reject) => {
    const existingContexts = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT']
    });
    if (existingContexts.length > 0) {
      console.log("[Background] Offscreen document already exists.");
      return resolve();
    }
    const readyListener = (message, sender) => {
      if (message.type === 'OFFSCREEN_READY' && sender.url.includes('offscreen.html')) {
        console.log("[Background] Offscreen document is ready.");
        chrome.runtime.onMessage.removeListener(readyListener);
        resolve();
      }
    };
    chrome.runtime.onMessage.addListener(readyListener);
    try {
      console.log("[Background] Creating offscreen document...");
      await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['DOM_SCRAPING'],
        justification: 'Run Transformers.js AI model for text definitions'
      });
    } catch (err) {
      console.error("[Background] Error creating offscreen document:", err);
      chrome.runtime.onMessage.removeListener(readyListener);
      offscreenDocumentPromise = null;
      reject(err);
    }
  });
  return offscreenDocumentPromise;
}

// =============================================================
// NEW: Load the model when the browser first starts
// =============================================================
chrome.runtime.onStartup.addListener(() => {
  console.log("[Background] Browser startup detected. Pre-loading AI model...");
  createOffscreenDocument().catch(err => {
    console.error("[Background] Error pre-loading model on startup:", err);
  });
});

// Initialize on extension install
chrome.runtime.onInstalled.addListener(() => {
  console.log("[Background] Extension installed");
  chrome.contextMenus.create({
    id: "defineText",
    title: "Define with Gemma",
    contexts: ["selection"]
  });
  // You could also trigger loading on install for the very first session
  createOffscreenDocument().catch(err => {
    console.error("[Background] Error pre-loading model on install:", err);
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "defineText" && info.selectionText) {
    try {
      await chrome.tabs.sendMessage(tab.id, {
        type: "SHOW_DEFINITION",
        text: info.selectionText
      });
    } catch (err) {
      console.error("[Background] Content script not ready. Please refresh the page.", err);
      // Optionally, you can add an alert or some user feedback here.
    }
  }
});

// Handle messages
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'OFFSCREEN_READY') return false;

  console.log(`[Background] Received message: ${msg.type}`);
  if (msg.type === "MODEL_PROGRESS") {
    chrome.runtime.sendMessage(msg).catch(() => {});
    return false;
  }
  if (sender.url && sender.url.includes('offscreen.html')) {
    return false;
  }
  if (msg.type === "GET_DEFINITION") {
    handleDefinitionRequest(msg.text, sendResponse);
    return true;
  }
  if (msg.type === "PING") {
    sendResponse({ pong: true });
    return false;
  }
});

// Handler for definition requests
async function handleDefinitionRequest(text, sendResponse) {
  try {
    await createOffscreenDocument();
    const response = await chrome.runtime.sendMessage({
      type: "GENERATE_TEXT",
      text: text
    });
    sendResponse(response);
  } catch (err) {
    console.error("[Background] Definition request failed:", err);
    sendResponse({ error: err.message });
  }
}