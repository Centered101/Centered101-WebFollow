// นำเข้าฟังก์ชันจาก SDK ของ Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// การตั้งค่า Firebase สำหรับเว็บแอป
// สำหรับ Firebase JS SDK เวอร์ชัน 7.20.0 และหลังจากนั้น, measurementId เป็นตัวเลือก (optional)
const firebaseConfig = {
    apiKey: "AIzaSyClIhLBx2oPqn-84-nrePSZRaRU933GB78",
    authDomain: "centered101-webfollow.firebaseapp.com",
    databaseURL: "https://centered101-webfollow-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "centered101-webfollow",
    storageBucket: "centered101-webfollow.appspot.com",
    messagingSenderId: "1010980971454",
    appId: "1:1010980971454:web:c4ca79e673ab5ad359cfef",
    measurementId: "G-37SEF7VTCV"
};

// เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);