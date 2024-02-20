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
  popup.innerHTML = `Converted Date: ${date}`; // Change textContent to innerHTML to include HTML elements.

  // Create close button
  const closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;"; // Using HTML entity for 'x'
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

  // Close button functionality
  closeButton.onclick = function() {
    popup.remove();
  };

  // Add closeButton to the popup
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
    width: "270px"
  });

  document.body.appendChild(popup);
}

// function showPopup(date) {
//   const existingPopup = document.getElementById("epochConverterPopup");
//   if (existingPopup) {
//     existingPopup.remove();
//   }

//   const popup = document.createElement("div");
//   popup.setAttribute("id", "epochConverterPopup");
//   popup.textContent = `Converted Date: ${date}`;
//   Object.assign(popup.style, {
//     position: "fixed",
//     top: "20px",
//     right: "20px",
//     backgroundColor: "#f9f9f9",
//     border: "1px solid #ccc",
//     padding: "10px",
//     borderRadius: "5px",
//     zIndex: "10000",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//     fontSize: "14px",
//     color: "#000",
//   });

//   document.body.appendChild(popup);

//   setTimeout(() => popup.remove(), 7000);
// }
