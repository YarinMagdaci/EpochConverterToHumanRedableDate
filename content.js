chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { date } = request;
  if (date) {
    showPopup(date);
  }
});

let keydownTimeoutId = null;

document.addEventListener("keydown", function(event) {
  if (keydownTimeoutId) {
    clearTimeout(keydownTimeoutId);
    keydownTimeoutId = null;
  }

  const isCommandOrCtrl = event.metaKey || event.ctrlKey;
  const isShift = event.shiftKey;

  if (isCommandOrCtrl && isShift) {
    // Normalize key to uppercase to handle both lower and uppercase
    const keyAction = event.key.toUpperCase();
    // Delay the execution slightly to distinguish between repeated and genuine keydowns
    keydownTimeoutId = setTimeout(() => {
      if (keyAction === 'S') {
        // Handle 'S' key action
        const selection = window.getSelection().toString().trim();
        const epochTime = parseInt(selection, 10);
        if (!isNaN(epochTime)) {
          const convertedDate = new Date(epochTime).toLocaleString(); // Assuming epochTime is in seconds
          showPopup(convertedDate);
        }
      } else if (keyAction === 'O') {
        // Handle 'O' key action
        showPopup(null, false);
      }
      keydownTimeoutId = null;
    }, 50); // Adjust the delay as needed
  }
});

function showPopup(date, isConvert = true) {
  const existingPopup = document.getElementById("epochConverterPopup");
  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.createElement("div");
  popup.setAttribute("id", "epochConverterPopup");

  const header = document.createElement("div");
  header.style.cssText = `
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
  `;

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.style.cssText = `
    cursor: pointer;
    color: red;
    font-size: 20px;
    padding: 0 5px;
  `;
  closeButton.onclick = function () {
    popup.remove();
  };

  header.appendChild(closeButton);
  popup.appendChild(header);

  const content = document.createElement("div");
  if (isConvert && date !== null) {
    content.innerHTML = `Converted Date: ${date}`;
  } else if (!isConvert) {
    content.innerHTML = `Date now epoch time is: ${Date.now()}`;
  }
  popup.appendChild(content);

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
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: "100px",
    maxWidth: "90%",
    width: "auto",
  });

  document.body.appendChild(popup);
}
