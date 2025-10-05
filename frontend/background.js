chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addNote",
    title: "Add Note",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "requestNotes",
    title: "Get Context",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addNote") {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showAddPopup,
        args: [info.selectionText]
      });

  }
  else {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showSummaryPopup,
        args: [info.selectionText]
      });
  }
});


function showAddPopup(selectedText) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();


    // Create highlight span
    const highlightSpan = document.createElement("span");
    highlightSpan.style.backgroundColor = "#9b8cff";
    highlightSpan.style.borderRadius = "3px";
    highlightSpan.classList.add("temporary-highlight");

    // Extract selection contents (preserves nested tags like <b>, <i>)
    const contents = range.extractContents();

    // Put the contents inside the span
    highlightSpan.appendChild(contents);

    // Insert span back into the document
    range.insertNode(highlightSpan);

    // Deselect the text
    selection.removeAllRanges();

    // Remove old popup if present
    let popup = document.getElementById("highlight-popup-ext");
    if (popup) popup.remove();

    // Create popup
    popup = document.createElement("div");
    popup.id = "highlight-popup-ext";
    popup.innerHTML = `
        <h3 style="margin-top: 8px; text-align: center; font-size: 16px; color: #333;">Publish Note</h3>
        <textarea id="noteBox" placeholder="Write your note here..." style="
            resize: none;
            padding: 10px;
            font-size: 14px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            margin-bottom: 15px;
            height: 80px;
            width: 80%;
            box-sizing: border-box;
        "></textarea>
        <button id="postButton" style="
            background: #4f46e5;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            width: 30%;
        ">Save Note</button>
    `;

    // Apply initial styles
    Object.assign(popup.style, {
        position: "absolute",
        width: "300px",
        padding: "15px",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: `"Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: 2147483647,
    });

    // Append first to measure height
    document.body.appendChild(popup);
    const popupHeight = popup.offsetHeight;

    const gap = 8; // gap between text and popup
    let top = rect.top + window.scrollY - popupHeight - gap;

    // If not enough room above, position below
    if (top < window.scrollY) {
        top = rect.bottom + window.scrollY + gap;
    }

    popup.style.top = `${top}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;

    // Add button behavior
    const postButton = popup.querySelector("#postButton");
    postButton.addEventListener("mouseover", () => postButton.style.background = "#4338ca");
    postButton.addEventListener("mouseout", () => postButton.style.background = "#4f46e5");
    postButton.addEventListener("mousedown", () => postButton.style.transform = "scale(0.98)");
    postButton.addEventListener("mouseup", () => postButton.style.transform = "scale(1)");

    postButton.addEventListener("click", async () => {
        const noteBox = popup.querySelector("#noteBox");
        const userText = noteBox.value.trim();

        // Remove input UI
        noteBox.remove();
        postButton.remove();

        const message = document.createElement("div");
        message.style.fontFamily = "Arial, sans-serif";
        message.style.padding = "10px";
        message.style.textAlign = "center";
        popup.appendChild(message);

        if (!userText) {
        message.textContent = "Please enter some text before posting.";
        return;
        }

        message.textContent = "Sending to backend...";

        try {
        const response = await fetch("http://localhost:5000/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            note: userText,
            statement: selectedText
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to post note");
        }

        const data = await response.json();
        message.textContent = `Posted successfully: ${data.note}`;
        console.log("Backend response:", data);

        } catch (err) {
        console.error(err);
        message.textContent = `Failed to send note: ${err.message}`;
        }
  });

  // Close popup on click outside
  function handleClickOutside(event) {
    if (!popup.contains(event.target)) {
      popup.remove();
     while (highlightSpan.firstChild) {
        highlightSpan.parentNode.insertBefore(highlightSpan.firstChild, highlightSpan);
        }
        highlightSpan.remove();
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
}


async function showSummaryPopup(selectedText) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Highlight the selection
    const highlightSpan = document.createElement("span");
    highlightSpan.style.backgroundColor = "#9b8cff";
    highlightSpan.style.borderRadius = "3px";
    highlightSpan.classList.add("temporary-highlight");

    const contents = range.extractContents();
    highlightSpan.appendChild(contents);
    range.insertNode(highlightSpan);
    selection.removeAllRanges();

    // Remove old popup if present
    let popup = document.getElementById("summary-popup-ext");
    if (popup) popup.remove();

    // Create popup with spinner + "Loading Context"
    popup = document.createElement("div");
    popup.id = "summary-popup-ext";
    popup.innerHTML = `
        <h3 id="popupHeader" style="margin-top: 8px; text-align: center; font-size: 16px; color: #333;">
          Loading Context
        </h3>
        <div id="summaryContent" style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
            width: 100%;
        ">
            <div class="loading-spinner" style="
                border: 4px solid #f3f3f3;
                border-top: 4px solid #4f46e5;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 1s linear infinite;
            "></div>
        </div>
    `;

    Object.assign(popup.style, {
        position: "absolute",
        width: "300px",
        padding: "15px",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: `"Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        zIndex: 2147483647,
    });

    document.body.appendChild(popup);

    // Add CSS animation for spinner
    const styleTag = document.createElement("style");
    styleTag.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleTag);

    // Position popup immediately
    const gap = 8;
    const popupHeight = popup.offsetHeight;
    let top = rect.top + window.scrollY - popupHeight - gap;
    if (top < window.scrollY) {
        top = rect.bottom + window.scrollY + gap;
    }
    popup.style.top = `${top}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;

    // Fetch summary in background
    try {
        const response = await fetch("http://localhost:5000/api/summary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ statement: selectedText })
        });

        const data = await response.json();
        const summaryDiv = popup.querySelector("#summaryContent");
        const header = popup.querySelector("#popupHeader");

        header.textContent = "Community Context";  // update header
        summaryDiv.style.display = "block";
        summaryDiv.style.textAlign = "left";
        summaryDiv.style.height = "auto";
        summaryDiv.textContent = data.summary;
    } catch (err) {
        const summaryDiv = popup.querySelector("#summaryContent");
        const header = popup.querySelector("#popupHeader");

        header.textContent = "Community Context";  // still update header
        summaryDiv.textContent = `Error fetching summary: ${err}`;
        summaryDiv.style.color = "red";
    }

    // Close on outside click
    function handleClickOutside(event) {
        if (!popup.contains(event.target)) {
            popup.remove();
            highlightSpan.replaceWith(...highlightSpan.childNodes);
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
}
