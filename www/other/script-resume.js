    // Get the button by ID
    var printButton = document.getElementById("print");

    // Add event listener for button click
    printButton.addEventListener("click", function () {
      try {
        // Use window.print() function to print the webpage
        window.print();
      } catch (err) {
        console.error("Cannot print: ", err);
        displayMessage(`Cannot print: ${err.message}`);
      }
    });

    // Function to display message
    function displayMessage(message) {
      const allTextTitle = document.getElementById("all_text_title");
      allTextTitle.innerHTML = message;
      allTextTitle.style.display = "block";

      setTimeout(() => {
        allTextTitle.style.display = "none";
      }, 3000);
    }

    // -รีเซ็ตweb------------------------------------------------------------------------------------------

    function resetWindow() {
      // เปิดหน้าเว็บใหม่
      // ให้โหลดหน้าเว็บใหม่จากริเควสเตอร์
      window.location.reload(true);
    }

    document.addEventListener("DOMContentLoaded", function () {
      const preloader = document.querySelector(".preloader");
      const content = document.querySelector("body");

      preloader.style.display = "none";
      content.style.display = "block";
    });

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