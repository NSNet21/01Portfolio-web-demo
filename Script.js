// Text typing Section

const textSwap = document.querySelector(".text-swap.red-text");
const articleSpan = document.querySelector(".article");

// คำทั้งหมดที่ต้องการให้หมุน
const words = [
  "Frontend Developer",
  "Programmer",
  "Fast-Learner",
  "Troubleshooter",
  "INTJ & Enneagram Type 5w6",
];

// ฟังก์ชันเช็คว่าขึ้นต้นด้วยสระไหม
function needsAn(word) {
  return /^[aeiouAEIOU]/.test(word.trim());
}

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let timeoutId; // เก็บ id ของ timeout ปัจจุบันไว้

function type() {
  const currentWord = words[wordIndex];
  // ตั้งค่า article ("a" หรือ "an") ตามคำแรก
  articleSpan.textContent = needsAn(currentWord) ? "an" : "a";

  // timeoutId memory clearing for prevent too much memory stack
  clearTimeout(timeoutId);

  if (!deleting) {
    textSwap.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      deleting = true;
      timeoutId = setTimeout(type, 2500); // พักก่อนลบ
      return;
    }
  } else {
    textSwap.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  timeoutId = setTimeout(type, deleting ? 50 : 100);
}

document.addEventListener("DOMContentLoaded", type);

// End of the text-typing section

// Theme manipulation section

const themeToggle = document.getElementById("themeSwap");
const root = document.documentElement;
const iconContainer = document.querySelector("i.fa-theme");
let currentIcon = iconContainer.className;
let cNameLight = "fa-regular fa-sun fa-theme";
let cNameDark = "fa-solid fa-moon fa-theme";
let IconOnLoad;

// ถ้ามี Theme ที่เคยเลือกไว้ใน localStorage ให้ใช้ค่านั้น
const savedTheme = localStorage.getItem("theme");
const savedIcon = localStorage.getItem("icon");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  IconOnLoad = iconContainer.classList = savedIcon;
}

// Function เปลี่ยน Theme
themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  // Change icon class to new icon class in DOM
  const isLight = iconContainer.classList.contains("fa-sun");
  const newIcon = isLight ? cNameDark : cNameLight;

  iconContainer.className = newIcon; // update the icon class in DOM

  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme); // บันทึกไว้ใน storage
  localStorage.setItem("icon", newIcon);
});

// End of theme manipulation section

// Navbar manipulation section

const hamIcon = document.getElementById("hamburger-icon");
const navBar = document.getElementsByTagName("nav");
const body = document.documentElement;
console.log(navBar);
hamIcon.addEventListener("click", (event) => {
  event.stopPropagation(); // ป้องกันไม่ให้คลิกไอคอนไปถึง document
  navBar[0].classList.toggle("active");
});

// When click on somewhere else out of the hamburger-icon & navbar
document.addEventListener("click", (event) => {
  const isClickInsideNav = navBar[0].contains(event.target);
  const isClickOnHam = hamIcon.contains(event.target);

  // If click somewhere else nav and not in the hamburger-icon -> close the menu
  if (!isClickInsideNav && !isClickOnHam) {
    navBar[0].classList.remove("active");
  }
});

// End of Navbar manipulation section
