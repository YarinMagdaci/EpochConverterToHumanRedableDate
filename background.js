chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convertEpoch",
    title: "Convert from epoch",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertEpoch") {
    const epochTime = parseInt(info.selectionText.trim(), 10);
    if (!isNaN(epochTime)) {
      const convertedDate = new Date(epochTime).toLocaleString();
      chrome.tabs.sendMessage(tab.id, { date: convertedDate });
    }
  }
});
