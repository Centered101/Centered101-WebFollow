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

document.addEventListener("contextmenu", function (event) {
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

document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.querySelector(".preloader");
  const content = document.querySelector(".color_change");

  preloader.style.display = "none";
  content.style.display = "block";
});

function startProgressBar() {
  const progressBar = document.getElementById('progress');
  progressBar.style.opacity = '1';
  progressBar.style.width = '0%';

  setTimeout(() => {
    progressBar.style.width = '100%';

    setTimeout(() => {
      progressBar.style.display = 'none';
    }, 500);

  }, 100);
}

document.addEventListener('DOMContentLoaded', (event) => {
  startProgressBar();
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

// ฟังก์ชันเพื่อตรวจสอบโหมดของผู้ใช้งาน
function applyTheme(theme) {
  var body = document.body;
  if (theme === 'dark') {
    body.classList.add('dark_mode');
    body.style.backgroundColor = "#333333";
  } else {
    body.classList.remove('dark_mode');
    body.style.backgroundColor = "#84D4FA";
  }
}

// ตรวจสอบการตั้งค่าโหมดสีของผู้ใช้งาน
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// ตั้งค่าโหมดตามการตั้งค่าของผู้ใช้งานหรือจากคุกกี้
function initializeMode() {
  var mode = getCookie("mode") || (userPrefersDark.matches ? 'dark' : 'light');
  applyTheme(mode);
  document.getElementById("modeSwitch").checked = (mode === "dark");
}

// ฟังก์ชันเปลี่ยนโหมดและบันทึกข้อมูลในคุกกี้
function toggleMode() {
  var isDarkMode = document.getElementById("modeSwitch").checked;
  var theme = isDarkMode ? "dark" : "light";
  
  applyTheme(theme);
  displayMessage(isDarkMode ? "โหมดมืด" : "โหมดสว่าง");

  // บันทึกสถานะในคุกกี้
  document.cookie = `mode=${theme}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

// โหลดคุกกี้
function getCookie(name) {
  var cookies = document.cookie.split(";").map(cookie => cookie.trim().split("="));
  var cookie = cookies.find(cookie => cookie[0] === name);
  return cookie ? cookie[1] : null;
}

// ลบคุกกี้
function clearCookies() {
  document.cookie = "mode=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; 
}

// ฟังค์ชันที่รับการเปลี่ยนแปลงเมื่อผู้ใช้เปลี่ยนการตั้งค่าโหมดสีในระบบ
userPrefersDark.addEventListener('change', (event) => {
  if (!getCookie("mode")) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});

// เริ่มต้นการตั้งค่าเมื่อโหลดหน้าเว็บ
window.onload = initializeMode;

document.addEventListener("keyup", keyup);

function keyup(event) {
  if (
    event.key === "g" ||
    event.key === "G" ||
    event.key === "เ" ||
    event.key === "ฌ"
  ) {
    randomColor();
    displayMessage("เปลี่ยนสี");
  }
}

// ฟังก์ชันสุ่มสีพื้นหลัง
function randomColor() {
  var body = document.getElementById("color_change");
  var newColor = getRandomColor(); // สุ่มสี
  body.style.backgroundColor = newColor; // เปลี่ยนสีพื้นหลังของ body
}

// ฟังก์ชันเพื่อเปลี่ยนสีพื้นหลังเป็นสีสุ่ม
function randomColor() {
  // สร้างค่าสีสุ่ม
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  // เปลี่ยนสีพื้นหลังของหน้าเว็บ
  document.body.style.backgroundColor = randomColor;
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
    button.style.transform = "1";
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
