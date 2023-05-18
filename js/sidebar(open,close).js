// =============== Start: Toggler (open, close) Profile =============== // Old 144 line

// ******************** Start Variables ********************
let sideBtn = document.querySelector(".my-profile .toggle"),
    closeSideBtn = document.querySelectorAll(".my-profile .close"),
    sideElements = document.querySelectorAll(".my-profile .side");
// ******************** End Variables ********************
// ------------------------------------------------------------

// ******************** Start Coding ********************
const toggleProfileFromSide = () => {
    // Open Side from click profile btn
    sideBtn.addEventListener("click", () => { openSide() });
    // Close Side from click close btn
    closeSideBtn.forEach(close => { close.addEventListener("click", () => { openSide() }) });
    // --------------
    // Check Data
    document.body.addEventListener("click", (e) => {
        if (e.target.dataset.open == "login") {
            openLogin();
        }
        if (e.target.dataset.open == "signup") {
            openSignup();
        }
        if (e.target.dataset.open == "user") {
            // openUser();
        }
    });
};
toggleProfileFromSide(); // to display none all items? just comment all this line
// ******************** End Coding ********************
// ------------------------------------------------------------

// ******************** Start Functions ********************
function openSide() {
    sideElements.forEach(ele => {
        ele.classList.toggle("show-side");
    });
};
// ------------------------------
function closeSide() {
    sideElements.forEach(ele => {
        ele.classList.remove("show-side");
    });
};
// ------------------------------
// ------------------------------
function openLogin() {
    sideElements.forEach(ele => {
        if (!ele.classList.contains("log-in")) {
            hiddenElement(ele);
        } else {
            showSideElement(ele);
        }
    });
};
// ------------------------------
function openSignup() {
    sideElements.forEach(ele => {
        if (!ele.classList.contains("sign-up")) {
            hiddenElement(ele);
        } else {
            showSideElement(ele);
        }
    });
};
// ------------------------------
function openUser() {
    sideElements.forEach(ele => {
        if (!ele.classList.contains("user")) {
            hiddenElement(ele);
        } else {
            showSideElement(ele);
        }
    });
};
// ------------------------------
// ------------------------------
function hiddenElement(element) {
    element.style.opacity = 0.2;
    setTimeout(() => {
        element.classList.remove("show");
    }, 500);
};
function showSideElement(element) {
    setTimeout(() => {
        element.classList.add("show");
    }, 800);
    setTimeout(() => {
        element.style.opacity = 1;
    }, 1000);
};
// ******************** End Functions ********************
// =============== End: Toggler (open, close) Profile ===============

// Old 144 line