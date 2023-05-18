// =============== Start: Navbar (open, close) (Info, Rank, Setting) ===============
// ******************** Start Variables ********************
let overlay = document.querySelector(".overlay"),
    openBtn = document.querySelectorAll(".tools i"),
    closeElementsBtn = document.querySelectorAll(".overlay .close"),
    info = document.querySelector(".info"),
    rank = document.querySelector(".rank"),
    setting = document.querySelector(".setting"),
    allElements = [info, rank, setting];
// ******************** End Variables ********************
// ------------------------------------------------------------

// ******************** Start Coding ********************
const openAndCloseElements = () => {
    // Open Elements
    openBtn.forEach(open => {
        open.addEventListener("click", () => {
            if (open.classList.contains("e-info")) { showNavElement(info) };
            if (open.classList.contains("e-rank")) { showNavElement(rank) };
            if (open.classList.contains("e-setting")) { showNavElement(setting) };
        });
    });
    // Close Elements
    closeElementsBtn.forEach(close => {
        close.addEventListener("click", () => { closeNavElements() });
    });
};
openAndCloseElements(); // to display none all items? just comment all this line
// ******************** End Coding ********************
// ------------------------------------------------------------

// ******************** Start Functions ********************
function showNavElement(element) {
    overlay.style.display = "flex";
    element.style.display = "block";
    setTimeout(() => {
        element.style.transform = "translateY(0)";
        element.style.opacity = "1";
    }, 100);
};
// ------------------------------------
function closeNavElements() {
    allElements.forEach(ele => {
        ele.style.transform = "translateY(500px)";
        ele.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
            ele.style.display = "none";
        }, 200);
    });
};
// ******************** End Functions ********************
// =============== End: Navbar (open, close) (Info, Rank, Setting) ===============

// Old 56 line