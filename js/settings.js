// =============== Start: Settings (Dark Mode, high color mode) ===============
// ******************** Start Variables ********************
// ------------------------------------------------------------------>>> Dark Mode
let darkModeBtn = document.querySelector(".mode"),
    darkModeIcon = document.querySelector(".mode i"),
    root = document.querySelector(":root");
// ------------------------------------------------------------------>>> High Color Mode
let highInput = document.querySelector(".high-color input"),
    changeColor = document.querySelector(".high-color .changeColor");
// ******************** End Variables ********************
// ------------------------------------------------------------

// ******************** Start Coding ********************
// ------------------------------------------------------------------>>> Dark Mode
const darkMode = () => {
    // Get Data From localStorage
    if (localStorage.getItem("white") && localStorage.getItem("black")) { getDarkModeFromLocalStorage() };
    // Get Data From click on Btn
    darkModeBtn.addEventListener("click", () => {
        darkModeIcon.classList.contains("fa-sun") ? turnOnDarkMode() : turnOffDarkMode();
    });
};
darkMode(); // to stop dark mode? just comment all this line
// -------------------------------------------------------->>> Spacing
// ------------------------------------------------------------------>>> High Color Mode
// -------------------------------------------------------->>> Spacing
const highColorMode = () => {
    // Get Data From localStorage
    if (localStorage.getItem("highMode") && localStorage.getItem("greenCol") && localStorage.getItem("goldCol") && localStorage.getItem("check")) {
        getHighColorFromLocalStorage();
    };
    // Get Data From click on Btn
    changeColor.addEventListener("click", () => {
        changeColor.classList.contains("off") ? turnOnHighColor() : turnOffHighColor();
    });
};
highColorMode(); // to stop High Color mode? just comment all this line
// ******************** End Coding ********************
// ------------------------------------------------------------

// ******************** Start Functions ********************
// ------------------------------------------------------------------>>> Dark Mode
function turnOnDarkMode() {
    // set color in page
    darkModeIcon.classList.replace("fa-sun", "fa-moon");
    root.style.setProperty('--white-color', 'black');
    root.style.setProperty('--black-color', 'white');
    // set color in localStorage
    localStorage.setItem("white", "black");
    localStorage.setItem("black", "white");
    localStorage.setItem("icon", "fa-moon");
};
// ------------------------------------
function turnOffDarkMode() {
    // Set Color in page
    darkModeIcon.classList.replace("fa-moon", "fa-sun");
    root.style.setProperty('--white-color', 'white');
    root.style.setProperty('--black-color', 'black');
    // Set Color in local
    localStorage.setItem("white", "white");
    localStorage.setItem("black", "black");
    localStorage.setItem("icon", "fa-sun");
};
// ------------------------------------
function getDarkModeFromLocalStorage() {
    // Set Color in page
    root.style.setProperty('--white-color', `${localStorage.getItem("white")}`);
    root.style.setProperty('--black-color', `${localStorage.getItem("black")}`);
    // --------
    if (localStorage.getItem("icon")) {
        darkModeIcon.className = `fa-regular ${localStorage.getItem("icon")}`;
    }
};
// ------------------------------------------------------------------>>> High Color Mode
function turnOnHighColor() {
    // Set Color in page
    changeColor.classList.replace("off", "on");
    root.style.setProperty("--green-color", "#F5793A");
    root.style.setProperty("--gold-color", "#85C0F9");
    // Set Color in local
    localStorage.setItem("highMode", "on");
    localStorage.setItem("greenCol", "#F5793A");
    localStorage.setItem("goldCol", "#85C0F9");
    // Saved BTN Check 
    setTimeout(() => {
        if (!highInput.hasAttribute("checked")) {
            highInput.setAttribute("checked", "");
            localStorage.setItem("check", "checked");
        }                        
    }, 10);
};
// ------------------------------------
function turnOffHighColor() {
    // Set Color in page
    changeColor.classList.replace("on", "off");
    root.style.setProperty("--green-color", "#6AAA64");
    root.style.setProperty("--gold-color", "#C9B458");
    // Set Color in local
    localStorage.setItem("highMode", "off");
    localStorage.setItem("greenCol", "#6AAA64");
    localStorage.setItem("goldCol", "#C9B458");
    // Saved BTN Check 
    setTimeout(() => {
        if (highInput.hasAttribute("checked")) {
            highInput.removeAttribute("checked");
            localStorage.setItem("check", "");
        }                        
    }, 10);
};
// ------------------------------------
function getHighColorFromLocalStorage() {
    // Change Class Name 
    changeColor.classList.replace("on", `${localStorage.getItem("highMode")}`);
    changeColor.classList.replace("off", `${localStorage.getItem("highMode")}`);
    // Set Color in page
    root.style.setProperty('--green-color', `${localStorage.getItem("greenCol")}`);
    root.style.setProperty('--gold-color', `${localStorage.getItem("goldCol")}`);
    // Saved BTN Check 
    highInput.setAttribute(`${localStorage.getItem("check")}`, "");
};
// ******************** End Functions ********************
// =============== End: Settings (Dark Mode, high color mode) ===============

// Old 105 line