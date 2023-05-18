// =============== Start: Game (Game mode, Game play) ===============
// ****************************** Start Variables ******************************
// --------------------------------------------------->>> Select Game mode
let beginner = "https://mohammedgomaa22.github.io/w-challenge/words%20file/beginner.json",
    amateur = "https://mohammedgomaa22.github.io/w-challenge/words%20file/amateur.json",
    semiPro = "https://mohammedgomaa22.github.io/w-challenge/words%20file/semi-pro.json",
    professional = "https://mohammedgomaa22.github.io/w-challenge/words%20file/professional.json",
    gameModeBtn = document.querySelectorAll(".change-mode .game-mode span"),
    gameMode = beginner;
// --------------------------------------------------->>> Game Play
let wordsArr = [],
    writeArr = [],
    rowInputs = document.querySelectorAll(".inputs .row-i"),
    keyLetters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"],
    rowNum = 0,
    colNum = 0,
    pointsGame = rowInputs.length,
    totalPoints = 0,
    notListEle = document.querySelector(".not-in-list"),
    lettersBtn = document.querySelectorAll(".letters button");
// ****************************** End Variables ******************************

// ****************************** Start Coding ******************************
// --------------------------------------------------->>> Select Game mode
const selectGameMode = () => {
    selectGameModeFromLocalStorage();
    selectGameModeFromClickEvent();
};
selectGameMode();
// --------------------------------------------------->>> Game Play
const gamePlay = () => {
    fetch(gameMode).then((obj) => obj.json()).then((obj) => {
        // Add Word To Words Array
        obj.allWords.forEach(word => { wordsArr.push(word.toLowerCase()) });

        // Functions 
        choseRandomWord();
        // console.log(chosenWord);
        createColumnsFromChosenWordLength();
        setTextToElements();
        clickedKeyboard();
        clickedMouse();
    });
};
gamePlay();
// ****************************** End Coding ******************************

// ****************************** Start Functions ******************************
// --------------------------------------------------->>> Select Game mode
function selectGameModeFromLocalStorage() {
    if (localStorage.getItem("mode-game")) {
        gameModeBtn.forEach(btn => {
            // Reset Classes 
            btn.className = "";
            if (btn.dataset.mode == localStorage.getItem("mode-game")) {
                btn.className = "select";
            };
        });
        // Set Game Mode
        localStorage.getItem("mode-game") == "beginner" ? gameMode = beginner :
        localStorage.getItem("mode-game") == "amateur" ? gameMode = amateur :
        localStorage.getItem("mode-game") == "semiPro" ? gameMode = semiPro :
        localStorage.getItem("mode-game") == "professional" ? gameMode = professional :
        gameMode = beginner;
    };
};
// ------------------------------------
function selectGameModeFromClickEvent() {
    document.addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-mode")) {
            // Set Classes
            gameModeBtn.forEach(btn => { btn.className = "" });
            e.target.className = "select";
            // Set Game Mode In Page
            e.target.dataset.mode == "beginner" ? gameMode = beginner :
            e.target.dataset.mode == "amateur" ? gameMode = amateur :
            e.target.dataset.mode == "semiPro" ? gameMode = semiPro :
            e.target.dataset.mode == "professional" ? gameMode = professional :
            gameMode = beginner;
            // Set Game Mode In Local Storage
            localStorage.setItem("mode-game", `${e.target.dataset.mode}`);
        };
    });
};
// --------------------------------------------------->>> Game Play
function choseRandomWord() {
    return chosenWord = wordsArr[Math.floor(Math.random() * wordsArr.length)].toLowerCase();
};
// ------------------------------------
function createColumnsFromChosenWordLength() {
    rowInputs.forEach(ele => {
        ele.style.gridTemplateColumns = `repeat(${chosenWord.length}, 1fr)`;
        for (let i = 0; i < chosenWord.length; i++) {
            document.createElement("span");
            // add classes 
            ele.appendChild(document.createElement("span"));
        }
    });  
};
// ------------------------------------
function setTextToElements() {
    // Try Numbers
    document.querySelector(".info .try-num").innerHTML = `Get ${rowInputs.length} chances to guess a ${chosenWord.length}-letter word.`;
    // Letters Numbers
    document.querySelector(".info .letter-num").innerHTML = `Each guess must be a valid ${chosenWord.length}-letter word.`;
};
// ------------------------------------
function clickedKeyboard() {
    document.addEventListener("keydown", (e) => {
        // Write letters in boxes
        if (keyLetters.includes(e.key.toLowerCase())) {
            writeLetters(e.key);
        }
        // Delete Letters
        if (e.key.toLowerCase() === "backspace" || e.key.toLowerCase() === "delete") {
            if (colNum > 0) { deleteLetters() };
        };
        // Check data after clicked Enter key
        if (e.key.toLowerCase() === "enter") { checkData() };
    });
};
// ------------------------------------
function clickedMouse() {
    lettersBtn.forEach(letter => {
        letter.addEventListener("click", () => {
            // Write letters in boxes
            if (keyLetters.includes(letter.dataset.key)) {
                writeLetters(letter.dataset.key);
            }
            // Delete Letters
            if (letter.dataset.key === "delete") {
                if (colNum > 0) {
                    deleteLetters();
                    if (letter.dataset.key != "delete" && letter.dataset.key != "enter") {
                        letter.className = "";
                    }
                }
            }
            // Check data after clicked Enter key
            if (letter.dataset.key === "enter") { checkData() };
        });
    });
};
// --------------------------------------------------->>> Keyboard and Buttons
function writeLetters(key) {
    if (colNum < chosenWord.length) {
        rowInputs[rowNum].childNodes[colNum].textContent = key;
        rowInputs[rowNum].childNodes[colNum].classList.add("border");
        colNum++;
    }
};
// -----------------------
function deleteLetters () {
    colNum--;
    rowInputs[rowNum].childNodes[colNum].textContent = "";
    rowInputs[rowNum].childNodes[colNum].classList.remove("border");
};
// -----------------------
function checkData() {
    if (rowNum < rowInputs.length) {
        if (colNum == chosenWord.length) {
            rowInputs[rowNum].childNodes.forEach(lett => {
                writeArr.push(lett.innerHTML.toLowerCase());
            });
            // ----------------
            if (wordsArr.includes(writeArr.join(""))) {
                // ------------------
                // ------------------
                if (writeArr.join("") == chosenWord) {
                    trueAnswer()
                } else {
                    falseAnswer();
                }
                // ------------------
                // ------------------
            } else {
                wordNotInList();
            }
        } else {
            LettersNotList();
        }
    };
};
// -----------------------
function trueAnswer () {
    rowInputs[rowNum].childNodes.forEach(lett => {
        lett.classList.remove("false-color");
        lett.classList.add("true-color");
        lett.style.border = "0";
    });
    gameFinish();
    rowNum = rowInputs.length;
};
// -----------------------
function falseAnswer() {
    rowInputs[rowNum].childNodes.forEach((lett, iLett) => {
        // Change Boxes Color
        if (chosenWord.split("").includes(lett.textContent)) {
            iLett == chosenWord.split("").indexOf(lett.textContent)
            ? trueInSpot(lett)
            : trueNotSpot(lett);
        } else {
            falseNotAnySpot(lett);
        }
        // Change Letters Button Color
        lettersBtn.forEach(btn => {
            if (lett.textContent == btn.dataset.key) {
                btn.className = lett.className;
            }
        });                    
    });
    // Reset Variables
    colNum = 0;
    rowNum++;
    pointsGame--;
    writeArr = [];
    failed();
};
// -----------------------
function trueInSpot(box) {
    box.classList.add("true-color");
    box.style.border = "0";
};
function trueNotSpot(box) {
    box.classList.add("t-f");
    box.style.border = "0";
};
function falseNotAnySpot(box) {
    box.classList.add("false-color");
    box.style.border = "0";
};
// -----------------------
function failed () {
    if (rowNum > (rowInputs.length - 1)) {
        let lastRow = [];
        rowInputs[rowInputs.length - 1].childNodes.forEach(lett => {
            lastRow.push(lett.innerHTML.toLowerCase());
        });
        if (lastRow.join("") != chosenWord) {
            gameFinish();
        }
    }  
};
// -----------------------
function wordNotInList() {
    animateWrong();
    notListEle.innerHTML = "Not in word list";
    notListEle.style.transform = "translate(-50%, 0)";
    writeArr = [];
    setTimeout(() => {
        notListEle.style.transform = "translate(-50%, -100px)";
    }, 1500);
};
// -----------------------
function LettersNotList() {
    animateWrong();
    notListEle.innerHTML = "Not enough letters"
    notListEle.style.transform = "translate(-50%, 0)";
    setTimeout(() => {
        notListEle.style.transform = "translate(-50%, -100px)";                        
    }, 1500);
};
// -----------------------
function animateWrong () {
    if (rowInputs[rowNum].className === "row-i") {
        rowInputs[rowNum].className = "row-i shake-horizontal";
    } else {
        rowInputs[rowNum].className = "row-i";
        setTimeout(() => {
            rowInputs[rowNum].className = "row-i shake-horizontal";
        }, 10);
    }
};
// -----------------------
function gameFinish() {
    // Start Create The Elements 
    // Variables
    const mainDiv = document.querySelector(".content .game-finish"),
        popUp = document.querySelector(".content .game-finish .popup"),
        title = document.querySelector(".content .game-finish .popup h1"),
        message = document.querySelector(".content .game-finish .popup h3"),
        scoreMess = document.querySelector(".content .game-finish .popup p"),
        btnNext = document.querySelector(".content .game-finish .popup button");
    // Append Text Node and Add Classes 
    if (pointsGame > 0) {
        title.innerHTML = "Winner";
        title.className = "winner";
        message.innerHTML = "You are great, you won";
        message.className = "winner";
        btnNext.innerHTML = "Next";
    } else {
        title.innerHTML = "Failed";
        title.className = "failed";
        message.innerHTML = "good luck, You failed this time";
        message.className = "failed";
        btnNext.innerHTML = "New Game!";
    }
    mainDiv.style.display = "flex";
    scoreMess.innerHTML = `You scored ${pointsGame} points`;
    setTimeout(() => {
        popUp.style.display = "flex";
        popUp.style.opacity = "1";
    }, 1000);
    popUp.style.transform = "translateY(0)";
    // End Create The Elements
    // -----------------------
    // Clicked Next From Keyboard
    document.onkeydown = (e) => {
        if (e.key == " " || e.key == "Escape") {
            nextGame(mainDiv, popUp);
        }
    }
    // Clicked Next BTN
    btnNext.onclick = () => {
        nextGame(mainDiv, popUp);
    };
};
// -----------------------
function nextGame(mainDiv, popUp) {
    if (mainDiv.style.display == "flex") {
        // Sum Total Points 
        totalPoints += pointsGame;
        // Reset Counters
        colNum = 0;
        rowNum = 0;
        writeArr = [];
        pointsGame = rowInputs.length;
        // Show Result Finally
        console.log(totalPoints);
        // Chosen Another Word
        choseRandomWord();
        console.log(chosenWord)
        // Reset Columns
        rowInputs.forEach(row => {
            row.innerHTML = "";
        });
        // Create New Columns
        createColumnsFromChosenWordLength();
        // Hide PopUp 
        mainDiv.style.display = "none";
        popUp.style.display = "none";
        popUp.style.opacity = "0";
        popUp.style.transform = "translateY(500px)";
        // Set BTN Classes
        lettersBtn.forEach(btn => {
            if (btn.dataset.key != "delete" && btn.dataset.key != "enter") {
                btn.className = "";
            }
        });
    };
};
// ****************************** End Functions ******************************
// =============== End: Game (Game mode, Game play) ===============

// Old 394 line