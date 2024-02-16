chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { date } = request;
  if (date) {
    showPopup(date);
  }
});

function showPopup(date) {
  const existingPopup = document.getElementById("epochConverterPopup");
  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.createElement("div");
  popup.setAttribute("id", "epochConverterPopup");
  popup.textContent = `Converted Date: ${date}`;
  Object.assign(popup.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    zIndex: "10000",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontSize: "14px",
  });

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 7000);
}
