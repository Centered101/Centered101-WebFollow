// -goBack-goForward-----------------------------------------------------------------------------------

function goBack() {
  window.history.back();
  displayMessage("กำลังกลับไปหน้าก่อนหน้า...");
}

function goForward() {
  window.history.forward();
  displayMessage("กำลังไปหน้าถัดไป...");
}

document.addEventListener("keydown", function (event) {
  // ตรวจสอบว่าปุ่มที่กดคือ Home หรือ ลูกศรซ้าย
  if (event.key === "ArrowLeft") {
    goBack();
    displayMessage("กำลังกลับไปหน้าก่อนหน้า...");
  }
  // ตรวจสอบว่าปุ่มที่กดคือ ลูกศรขวา
  else if (event.key === "ArrowRight") {
    goForward();
    displayMessage("กำลังไปหน้าถัดไป...");
  }
});
