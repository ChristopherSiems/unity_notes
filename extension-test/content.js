chrome.runtime.onMessage.addListener((msg) => {
    if (!msg.response) return;
  
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
  
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
  
    const popup = document.createElement("div");
    popup.id = "gemma-popup";
    popup.innerHTML = `
      <div style="
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        padding: 10px;
        max-width: 300px;
        font-family: sans-serif;
        font-size: 13px;
        z-index: 2147483647;
      ">
        <strong>Gemma says:</strong><br>${msg.response.text}
      </div>
    `;
    popup.style.position = "absolute";
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.top = `${rect.top + window.scrollY - 60}px`;
    popup.style.cursor = "pointer";
  
    popup.addEventListener("click", () => popup.remove());
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 7000);
  });
  