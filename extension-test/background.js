chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "showPopup",
      title: "Show popup for \"%s\"",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "showPopup") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showPopupAboveSelection,
        args: [info.selectionText]
      });
    }
  });
  
  // This function runs inside the webpage (via executeScript)
  function showPopupAboveSelection(selectedText) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
  
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
  
    let popup = document.getElementById("highlight-popup-ext");
    if (popup) popup.remove(); // remove old one
  
    popup = document.createElement("div");
    popup.id = "highlight-popup-ext";
    popup.textContent = `You selected: "${selectedText}"`;
    popup.style.position = "absolute";
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.top = `${rect.top + window.scrollY - 40}px`;
    popup.style.padding = "8px 12px";
    popup.style.background = "#fff";
    popup.style.border = "1px solid #ccc";
    popup.style.borderRadius = "6px";
    popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    popup.style.fontFamily = "sans-serif";
    popup.style.zIndex = "2147483647";
    popup.style.cursor = "pointer";
  
    popup.addEventListener("click", () => popup.remove());
    document.body.appendChild(popup);
  
    // Auto-remove after 5 seconds
    setTimeout(() => popup.remove(), 5000);
  }
  