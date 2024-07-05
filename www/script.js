// ########  ########  ###   ##  ########  ########  #######   ########  #######   ##  ########  ##
// ##        ##        ## #  ##     ##     ##        ##    ##  ##        ##    ##  ##  ##    ##  ##
// ##        ######    ##  # ##     ##     ######    #######   ######    ##    ##  ##  ##    ##  ##
// ##        ##        ##   ###     ##     ##        ##   ##   ##        ##    ##  ##  ##    ##  ##
// ########  ########  ##    ##     ##     ########  ##    ##  ########  #######   ##  ########  ##

// -script---------------------------------------------------------------------------------------------

// document.addEventListener("DOMContentLoaded", function () {
//     function replaceZeroWithHeart() {
//         const elements = document.querySelectorAll('body, body *:not(script):not(style)');

//         elements.forEach(element => {
//             if (element.children.length === 0) {
//                 let result = element.innerHTML;
//                 result = result.replace(/1/g, "<span class='color_change'>1</span>");
//                 result = result.replace(/2/g, "<span class='color_change'>2</span>");
//                 result = result.replace(/3/g, "<span class='color_change'>3</span>");
//                 result = result.replace(/4/g, "<span class='color_change'>4</span>");
//                 result = result.replace(/5/g, "<span class='color_change'>5</span>");
//                 result = result.replace(/6/g, "<span class='color_change'>6</span>");
//                 result = result.replace(/7/g, "<span class='color_change'>7</span>");
//                 result = result.replace(/8/g, "<span class='color_change'>8</span>");
//                 result = result.replace(/9/g, "<span class='color_change'>9</span>");
//                 result = result.replace(/0/g, "<span class='color_change'>♡</span>");
//                 element.innerHTML = result;
//             }
//         });
//     }

//     replaceZeroWithHeart();
// });

// -displayMessage-------------------------------------------------------------------------------------

// ฟังก์ชันเพื่อแสดงข้อความใน
function displayMessage(message) {
  const allTextTitle = document.getElementById("all_text_title");
  allTextTitle.innerHTML = message;
  allTextTitle.style.display = "block";

  setTimeout(() => {
    allTextTitle.style.display = "none";
  }, 2000);
}

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

// -ระบบบันทึก-----------------------------------------------------------------------------------------

// ระบบอจไม่ได้บันทึกการเปลี่ยนแปลงของคุณ
// window.addEventListener("beforeunload", (event) => {
//     event.preventDefault();
//     event.returnValue = "";
// });

// -เล่นเสียง------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  // รอจนกระทั่งเนื้อหาของหน้าเว็บโหลดเสร็จก่อนทำงาน

  var welcomeSound = document.getElementById("welcomeSound");
  var muteButton = document.getElementById("muteButton");
  var welcomeProgress = document.getElementById("welcomeProgress");

  // เล่นเสียงเมื่อหน้าเว็บโหลดเสร็จ
  welcomeSound.play();

  // ปิดเสียง/เล่นต่อเมื่อคลิกปุ่ม
  muteButton.addEventListener("click", function () {
    if (welcomeSound.paused) {
      welcomeSound.play(); // เล่นเสียงต่อ
      displayMessage("เล่นเสียงต่อ");
    } else {
      welcomeSound.pause(); // หยุดเสียง
      displayMessage("หยุดเสียง");
    }
  });

  // อัปเดตแถบความคืบหน้าของเสียงต้อนรับ
  welcomeSound.addEventListener("timeupdate", function () {
    welcomeProgress.value = welcomeSound.currentTime / welcomeSound.duration;
  });

  var audio = document.getElementById("audio");
  var playImage = document.getElementById("playImage");
  var audioProgress = document.getElementById("audioProgress");

  // เล่น/หยุดเสียงเมื่อคลิกรูปภาพ
  playImage.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0; // กลับไปเริ่มต้นใหม่
    }
  });

  // อัปเดตแถบความคืบหน้าของเสียง
  audio.addEventListener("timeupdate", function () {
    audioProgress.value = audio.currentTime / audio.duration;
  });

  // เพิ่มตัวฟังเหตุการณ์ keyup สำหรับคีย์ลัด Spacebar
  document.addEventListener("keyup", function (event) {
    if (event.code === "Space") {
      if (welcomeSound.paused) {
        welcomeSound.play(); // เล่นเสียงต่อ
        displayMessage("เล่นเสียงต่อ");
      } else {
        welcomeSound.pause(); // หยุดเสียง
        displayMessage("หยุดเสียง");
      }
    }
  });

  function displayMessage(message) {
    console.log(message); // เปลี่ยนเป็นการแสดงผลที่คุณต้องการ เช่น อัพเดทข้อความบนหน้าเว็บ
  }
});

// -รีเซ็ตweb------------------------------------------------------------------------------------------

function resetWindow() {
  // เปิดหน้าเว็บใหม่
  // ให้โหลดหน้าเว็บใหม่จากริเควสเตอร์
  window.location.reload(true);
  displayMessage("กำลังโหลดหน้าเว็บใหม่...");
}

// -name-tab-----------------------------------------------------------------------------------------

let tab = document.title;
window.addEventListener("blur", () => {
  document.title = "อ่านทำมั้ย กลับมาก่อนดิ๊";
});

window.addEventListener("focus", () => {
  document.title = tab;
});

// -เปลี่ยนสี------------------------------------------------------------------------------------------

// ฟังก์ชันเปลี่ยนโหมดและบันทึกข้อมูลในคุกกี้
function toggleMode() {
  var body = document.body;
  var modeSwitch = document.getElementById("modeSwitch");
  var isDarkMode = modeSwitch.checked;

  if (isDarkMode) {
    body.classList.add("dark_mode");
    var body = document.body;
    body.style.backgroundColor = "#333333";
    displayMessage("โหมดมืด");
  } else {
    body.classList.remove("dark_mode");
    var body = document.body;
    body.style.backgroundColor = "#84D4FA";
    displayMessage("โหมดสว่าง");
  }

  // บันทึกสถานะในคุกกี้
  document.cookie = `mode=${
    isDarkMode ? "dark" : "light"
  }; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

// โหลดโหมดจากคุกกี้เมื่อเริ่มต้น
window.onload = function () {
  var cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("="));
  var modeCookie = cookies.find((cookie) => cookie[0] === "mode");
  var mode = modeCookie ? modeCookie[1] : "light"; // ถ้ามีคุกกี้ mode ให้ใช้ค่าจากคุกกี้ ไม่มีก็ใช้โหมด Light Mode เป็นค่าเริ่มต้น
  var modeSwitch = document.getElementById("modeSwitch");

  if (mode === "dark") {
    document.body.classList.add("dark_mode");
    modeSwitch.checked = true;
  } else {
    document.body.classList.remove("dark_mode");
    modeSwitch.checked = false;
  }
};

// ฟังก์ชันเคลียร์คุกกี้
function clearCookies() {
  document.cookie = "mode=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // ลบคุกกี้ mode
}

document.addEventListener("keyup", keyup);

function keyup(event) {
  if (event.key === "g") {
    randomColor();
  }
}

// ฟังก์ชันสุ่มสีพื้นหลัง
function randomColor() {
  var body = document.getElementById("color_change");
  var newColor = getRandomColor(); // สุ่มสี
  body.style.backgroundColor = newColor; // เปลี่ยนสีพื้นหลังของ body
}

// ฟังก์ชันสำหรับสร้างสีสุ่ม
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// -scrolltotop----------------------------------------------------------------------------------------

// ฟังก์ชันเพื่อเลื่อนไปที่ด้านบนสุดของหน้า
function scrollToTop() {
  if (!scrolling) {
    scrolling = true;
    scrollToTopAnimation();
  }
}

// ฟังก์ชันเพื่อทำการเลื่อนไปที่ด้านบนด้วยการเคลื่อนไหวแบบอนิเมชั่น
function scrollToTopAnimation() {
  var currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;

  // ถ้าตำแหน่งการเลื่อนยังไม่ถึงด้านบนสุด
  if (currentScroll > 0) {
    window.requestAnimationFrame(scrollToTopAnimation);
    // เลื่อนขึ้นทีละน้อย (ปรับความเร็วได้ที่นี่)
    window.scrollTo(0, currentScroll - currentScroll / 10);
  } else {
    scrolling = false;
  }
}

// ฟังก์ชันเพื่อเลื่อนไปที่ด้านล่างสุดของหน้า
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

// ฟังก์ชันจัดการเหตุการณ์ keyup
function keyup(event) {
  if (
    event.key === "t" ||
    event.key === "T" ||
    event.key === "ะ" ||
    event.key === "ธ" ||
    event.key === "ArrowUp"
  ) {
    scrollToTop();
    displayMessage("กำลังขึ้น...");
  } else if (
    event.key === "b" ||
    event.key === "B" ||
    event.key === "ิ" ||
    event.key === "ฺ" ||
    event.key === "ArrowDown"
  ) {
    scrollToBottom();
    displayMessage("กำลังลง...");
  }
}

// เพิ่มตัวฟังเหตุการณ์ keyup ให้กับ document
document.addEventListener("keyup", keyup);

// ตัวแปรเพื่อติดตามสถานะการเลื่อน
var scrolling = false;

// ฟังก์ชันแสดง/ซ่อนปุ่มเลื่อนไปด้านบนสุดตามตำแหน่งการเลื่อนของหน้าเว็บ
function showScrollToTopButton() {
  var button = document.getElementById("scrollToTopButton");

  // ถ้าการเลื่อนเกิน 20 พิกเซลให้แสดงปุ่ม
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    // ซ่อนปุ่มเมื่ออยู่ด้านบน
    button.style.display = "none";
  }
}

// ฟังก์ชันแสดง/ซ่อนปุ่มเลื่อนไปด้านล่างสุดตามตำแหน่งการเลื่อนของหน้าเว็บ
function showScrollToBottomButton() {
  var button = document.getElementById("scrollToBottomButton");

  // ถ้าไม่อยู่ด้านล่างสุดให้แสดงปุ่ม
  if (window.innerHeight + window.scrollY < document.body.scrollHeight - 20) {
    button.style.display = "block";
  } else {
    // ซ่อนปุ่มเมื่ออยู่ด้านล่าง
    button.style.display = "none";
  }
}

// เพิ่มตัวฟังเหตุการณ์การเลื่อนให้กับ window
window.onscroll = function () {
  showScrollToTopButton();
  showScrollToBottomButton();
};

function copyText() {
  // เลือก element ที่ต้องการคัดลอก
  var textElement = document.getElementById("textToCopy");
  var text = textElement.innerText;

  // ใช้ Clipboard API
  navigator.clipboard
    .writeText(text)
    .then(function () {
      console.log(`คัดลอกไปยังคลิปบอร์ดแล้ว: ${text}`);
      displayMessage(`คัดลอกไปยังคลิปบอร์ดแล้ว: ${text}`);
    })
    .catch(function (err) {
      console.error("ไม่สามารถคัดลอกได้: ", err);
      displayMessage(`ไม่สามารถคัดลอกได้: ${err}`);
    });
}
