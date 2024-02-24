chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { date } = request;
  if (date) {
    showPopup(date);
  }
});

document.addEventListener("keydown", function (event) {
  if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "E") {
    const selection = window.getSelection().toString().trim();
    const epochTime = parseInt(selection, 10);
    if (!isNaN(epochTime)) {
      const convertedDate = new Date(epochTime).toLocaleString();
      showPopup(convertedDate);
    }
  }
});

document.addEventListener("keydown", function (event) {
  if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "Y") {
    showPopup(null, false);
  }
});

function showPopup(date, isConvert = true) {
  const existingPopup = document.getElementById("epochConverterPopup");
  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.createElement("div");
  popup.setAttribute("id", "epochConverterPopup");
  if (isConvert) {
    popup.innerHTML = `Converted Date: ${date}`;
  } else {
    popup.innerHTML = `Date now epoch time is: ${Date.now()}`;
  }

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.style.cssText = `
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    color: red;
    border: 1px solid black;
    border-radius: 50%;
    padding: 0 5px;
    padding-bottom: 5px;
    height: 10px;
  `;

  closeButton.onclick = function () {
    popup.remove();
  };

  popup.appendChild(closeButton);

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
    color: "#000",
    display: "flex",
    justifyContent: "space-between",
    width: "270px",
  });

  document.body.appendChild(popup);
}
