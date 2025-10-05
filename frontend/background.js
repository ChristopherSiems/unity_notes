chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addNote",
    title: "Add Note",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "requestNotes",
    title: "Request Notes",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addNote") {
    chrome.windows.create({
    url: chrome.runtime.getURL(`addPopup/addPopup.html?text=${encodeURIComponent(info.selectionText)}`),
    type: "popup",
    width: 400,
    height: 300
    });
  }
  else {
    chrome.windows.create({
      url: chrome.runtime.getURL("requestPopup/requestPopup.html"),
      type: "popup",
      width: 400,
      height: 300
    });
  }
});

