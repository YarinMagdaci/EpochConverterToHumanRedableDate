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
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: showConvertedDate,
        args: [convertedDate],
      });
    }
  }
});

function showConvertedDate(convertedDate) {
  alert(`Converted Date: ${convertedDate}`);
}
