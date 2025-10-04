// ============================================
// content.js - COMPLETE VERSION
// ============================================

let selectedText = "";
let floatingPopup = null;

console.log("[Content] Script loaded and ready");

// Respond to ping from background
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("[Content] Received message:", msg.type);
  
  if (msg.type === "PING") {
    sendResponse({ pong: true });
    return false;
  }
  
  if (msg.type === "SHOW_DEFINITION") {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      showDefinitionPopup(msg.text, rect);
    }
    return false;
  }
});

// Track text selection
document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  selectedText = selection.toString().trim();
  
  if (selectedText.length > 0 && selectedText.length < 200) {
    console.log("[Content] Text selected:", selectedText);
    showFloatingButton(selection);
  } else {
    removeFloatingButton();
  }
});

// Show floating button near selection
function showFloatingButton(selection) {
  removeFloatingButton();
  
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  
  const button = document.createElement('div');
  button.id = 'gemma-define-btn';
  button.innerHTML = '✨ Define';
  button.style.cssText = `
    position: fixed;
    left: ${rect.left + window.scrollX}px;
    top: ${rect.bottom + window.scrollY + 5}px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    transition: transform 0.2s, box-shadow 0.2s;
  `;
  
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
  });
  
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    showDefinitionPopup(selectedText, rect);
  });
  
  document.body.appendChild(button);
  floatingPopup = button;
}

function removeFloatingButton() {
  if (floatingPopup) {
    floatingPopup.remove();
    floatingPopup = null;
  }
}

// Show definition popup
function showDefinitionPopup(text, rect) {
  removeFloatingButton();
  
  const popup = document.createElement('div');
  popup.id = 'gemma-definition-popup';
  popup.style.cssText = `
    position: fixed;
    left: ${Math.min(rect.left + window.scrollX, window.innerWidth - 360)}px;
    top: ${rect.bottom + window.scrollY + 10}px;
    width: 340px;
    max-height: 500px;
    background: white;
    border-radius: 12px;
    padding: 20px;
    z-index: 10001;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    overflow-y: auto;
  `;
  
  popup.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
      <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">AI Definition</h3>
      <button id="gemma-close-btn" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #888; line-height: 1; padding: 0; width: 24px; height: 24px;">&times;</button>
    </div>
    <div style="margin-bottom: 16px; padding: 12px; background: #f7f7f8; border-radius: 8px; font-size: 13px; color: #555; border-left: 3px solid #667eea;">
      "${text}"
    </div>
    <div id="gemma-result" style="font-size: 14px; color: #333; line-height: 1.6;">
      <div style="text-align: center; padding: 30px;">
        <div style="border: 3px solid #f0f0f0; border-top: 3px solid #667eea; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        <p style="margin-top: 16px; color: #888; font-size: 13px;">Generating definition...</p>
      </div>
    </div>
  `;
  
  // Add spinner animation
  if (!document.getElementById('gemma-spinner-style')) {
    const style = document.createElement('style');
    style.id = 'gemma-spinner-style';
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(popup);
  
  // Close button
  popup.querySelector('#gemma-close-btn').addEventListener('click', () => {
    popup.remove();
  });
  
  // Get definition from background
  chrome.runtime.sendMessage({
    type: "GET_DEFINITION",
    text: text
  }, (response) => {
    const resultDiv = popup.querySelector('#gemma-result');
    if (!resultDiv) return; // Popup might have been closed
    
    if (!response) {
      resultDiv.innerHTML = `<p style="color: #e53e3e;">Error: No response received</p>`;
      return;
    }
    
    if (response.error) {
      resultDiv.innerHTML = `<p style="color: #e53e3e; padding: 12px; background: #fff5f5; border-radius: 6px;">⚠️ ${response.error}</p>`;
    } else {
      resultDiv.innerHTML = `<p style="margin: 0;">${response.response}</p>`;
    }
  });
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
  const popup = document.getElementById('gemma-definition-popup');
  if (popup && !popup.contains(e.target)) {
    popup.remove();
  }
  
  const button = document.getElementById('gemma-define-btn');
  if (button && !button.contains(e.target)) {
    removeFloatingButton();
  }
});

// ============================================
// offscreen.js - NO CHANGES NEEDED
// ============================================
// Your existing offscreen.js code is fine!