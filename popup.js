// This script would be triggered by the background script instead of using alert().
function setDateInPopup(date) {
  document.getElementById(
    "dateDisplay"
  ).textContent = `Converted Date: ${date}`;
}
