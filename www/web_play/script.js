document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preloader");
  const content = document.querySelector(".color_change");

  preloader.style.display = "none";
  content.style.display = "block";
});

// -goBack-goForward-----------------------------------------------------------------------------------

document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); // ป้องกันเมนูคลิกขวาจากการแสดง
  window.history.back(); // ย้อนกลับไปหน้าเดิม
});

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

// -name-tab-----------------------------------------------------------------------------------------

let originalTitle = document.title;
let favicon = document.getElementById("favicon");
let originalFavicon = favicon.href;
let blurredFavicon = "/images/Tes-D.png"; // Replace with the path to your blurred favicon image

window.addEventListener("blur", () => {
    document.title = "Centered101";
    favicon.href = blurredFavicon;
});

window.addEventListener("focus", () => {
    document.title = originalTitle;
    favicon.href = originalFavicon;
});