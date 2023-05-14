// -------------------------------------------------------------------
// -------------------------------------------------------------------
const toggler = () => {
    const toggle = document.querySelector(".my-profile .toggle"),
        side = document.querySelectorAll(".my-profile .side");
    // -----------

    toggle.addEventListener("click", () => {
        side.forEach(ele => {
            ele.classList.toggle("show-side");
        });
    });
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("close")) {
            side.forEach(ele => {
                ele.classList.toggle("show-side");
            });
        }
    });
};
toggler();
// ------------------------------------------
const overlay = () => {
    const over = document.querySelector(".overlay"),
        info = document.querySelector(".info"),
        rank = document.querySelector(".rank"),
        setting = document.querySelector(".setting");
    // ------------------

    // Events
    document.body.addEventListener(("click"), (e) => {
        // Open Overlay
        if (e.target.classList.contains("e-info")) {
            over.style.display = "flex";
            info.style.display = "block";
            setTimeout(() => {
                info.style.transform = "translateY(0)";
                info.style.opacity = "1";
            }, 100);
        } else if (e.target.classList.contains("e-rank")) {
            over.style.display = "flex";
            rank.style.display = "block";
            setTimeout(() => {
                rank.style.transform = "translateY(0)";
                rank.style.opacity = "1";
            }, 100);
        } else if (e.target.classList.contains("e-setting")) {
            over.style.display = "flex";
            setting.style.display = "block";
            setTimeout(() => {
                setting.style.transform = "translateY(0)";
                setting.style.opacity = "1";
            }, 100);
        }
        // Close Overlay
        if (e.target.classList.contains("close") || e.target.classList.contains("overlay")) {
            // info
            info.style.transform = "translateY(500px)";
            info.style.opacity = "0";
            // rank
            rank.style.transform = "translateY(500px)";
            rank.style.opacity = "0";
            // setting
            setting.style.transform = "translateY(500px)";
            setting.style.opacity = "0";
            setTimeout(() => {
                over.style.display = "none";
                // info
                info.style.display = "none";
                // rank
                rank.style.display = "none";
                // setting
                setting.style.display = "none";
            }, 200);
        }
    });

};
overlay();
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------- Start Game Coding -----------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
const game = () => {
    // Settings Buttons
    const SettingsButtons = () => {
        // Start Var 
        const btnChange = document.querySelector(".mode"),
        mode = document.querySelector(".mode i"),
        root = document.querySelector(":root");
        // End Var
        // -----------------
        // Light and Dark Mode
        function darkMode() {
            // Check localStorage
            if (localStorage.getItem("white") && localStorage.getItem("black")) {
                // Set Color in page
                root.style.setProperty('--white-color', `${localStorage.getItem("white")}`);
                root.style.setProperty('--black-color', `${localStorage.getItem("black")}`);
                // --------
                if (localStorage.getItem("icon")) {
                    mode.className = `fa-regular ${localStorage.getItem("icon")}`;
                }
            };
            // Event btn
            btnChange.addEventListener(("click"), () => {
                if (mode.classList.contains("fa-sun")) {
                    // Change Icon BTN
                    mode.classList.replace("fa-sun", "fa-moon");
                    // Set Color in page
                    root.style.setProperty('--white-color', 'black');
                    root.style.setProperty('--black-color', 'white');
                    // Set Color in local
                    localStorage.setItem("white", "black");
                    localStorage.setItem("black", "white");
                    // ---------
                    localStorage.setItem("icon", "fa-moon");
                } else {
                    // Change Icon BTN
                    mode.classList.replace("fa-moon", "fa-sun");
                    // Set Color in page
                    root.style.setProperty('--white-color', 'white');
                    root.style.setProperty('--black-color', 'black');
                    // Set Color in local
                    localStorage.setItem("white", "white");
                    localStorage.setItem("black", "black");
                    // ---------
                    localStorage.setItem("icon", "fa-sun");
                }
            });        
        };
        darkMode();
        // -----------------
        // High Color Mode
        function highColor() {
            const highInput = document.querySelector(".high-color input");
            const changeColor = document.querySelector(".high-color .changeColor");
            // Check localStorage
            if (localStorage.getItem("highMode") && localStorage.getItem("greenCol") && localStorage.getItem("goldCol") && localStorage.getItem("check")) {
                // Change Class Name 
                changeColor.classList.replace("on", `${localStorage.getItem("highMode")}`);
                changeColor.classList.replace("off", `${localStorage.getItem("highMode")}`);
                // Set Color in page
                root.style.setProperty('--green-color', `${localStorage.getItem("greenCol")}`);
                root.style.setProperty('--gold-color', `${localStorage.getItem("goldCol")}`);
                // Saved BTN Check 
                highInput.setAttribute(`${localStorage.getItem("check")}`, "");
            };
            // localStorage.clear()
            changeColor.addEventListener("click", () => {
                if (changeColor.classList.contains("off")) {
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
                } else {
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
                }
            });
        }
        highColor();
        // -----------------
    };
    SettingsButtons();
    // -------------------------------------------------------------------
    // -------------------------------------------------------------------
    // -------------------------------------------------------------------
    // -------------------------------------------------------------------
    // -------------------------- Start Game Play -----------------------------
    // -------------------------------------------------------------------
    // -------------------------------------------------------------------
    // -------------------------------------------------------------------
    // -------------------------------------------------------------------
    function gamePlay() {
        // -------------- Start Variables --------------
        const rowInputs = document.querySelectorAll(".inputs .row-i"),
            btnLetters = document.querySelectorAll(".letters button"),
            words = [];
        let beginner = "../words file/beginner.json",
            amateur = "../words file/amateur.json",
            semiPro = "../words file/semi-pro.json",
            professional = "../words file/professional.json",
            playMode = beginner,
            mode = document.querySelectorAll(".change-mode .game-mode span");
        // -----------------------------
        let keyLetters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"],
            boxNum = 0,
            rowNum = 0,
            points = 0,
            notList = document.querySelector(".not-in-list");
        // Set Text Elements
        document.querySelector(".info .try-num").innerHTML = `Guess the W | Challenge in ${rowInputs.length} tries.`;
        // Start Game Coding
        // -------------- End Variables --------------
        // -----------------------------
        // Start Change Game Mode Function
        function gameMode() {
            // Start Get data from Local
            if (localStorage.getItem("mode-game")) {
                mode.forEach(mode => {
                    // Reset Classes in page
                    mode.className = "";
                    if (mode.dataset.mode == localStorage.getItem("mode-game")) {
                        mode.className = "select";
                    }
                });
                // Set Game Mode In Page
                if (localStorage.getItem("mode-game") == "beginner") {
                    playMode = beginner;
                } else if (localStorage.getItem("mode-game") == "amateur") {
                    playMode = amateur;
                } else if (localStorage.getItem("mode-game") == "semiPro") {
                    playMode = semiPro;
                } else if (localStorage.getItem("mode-game") == "professional") {
                    playMode = professional;
                } else {
                    playMode = beginner;
                }
            };
            // End Get data from Local
            // -------------------------------------------------
            // -------------------------------------------------
            document.addEventListener("click", (e) => {
                if (e.target.hasAttribute("data-mode")) {
                    // Set Game Mode In Page
                    mode.forEach(mode => {
                        mode.className = "";
                    });
                    e.target.className = "select";
                    // Set Game Mode In Page
                    if (e.target.dataset.mode == "beginner") {
                            playMode = beginner;
                    } else if (e.target.dataset.mode == "amateur") {
                            playMode = amateur;
                    } else if (e.target.dataset.mode == "semiPro") {
                            playMode = semiPro;
                    } else if (e.target.dataset.mode == "professional") {
                            playMode = professional;
                    } else {
                            playMode = beginner;
                    }
                    // Set Game Mode In Local Storage
                    localStorage.setItem("mode-game", `${e.target.dataset.mode}`);
                }
            });
            // -------------------------------------------------
        };
        gameMode();
        // -----------------------------
        setTimeout(() => {
            fetch(playMode).then((obj) => obj.json()).then((obj) => {
                obj.allWords.forEach(word => {
                    words.push(word.toLowerCase());
                });
                // -----------------------------
                // -------------For Testing----------------
                // -------------For Testing----------------
                // -----------------------------
                // Chosen random word From Array ----------------
                function chose () {
                    return chosenWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
                }
                chose();
                function countColumns () {
                    return countCol = chosenWord.length;
                };
                countColumns();
                console.log(chosenWord);
                // ----------------------------------------------
                // Start Create Elements
                // Set Text Elements
                document.querySelector(".info .letter-num").innerHTML = `Each guess must be a valid ${chosenWord.length}-letter word.`;
                // Columns 
                function createCol () {
                    rowInputs.forEach(ele => {
                        ele.style.gridTemplateColumns = `repeat(${countCol}, 1fr)`;
                        for (let i = 0; i < countCol; i++) {
                            const colInputs = document.createElement("span");
                            // add classes 
                            ele.appendChild(colInputs);
                        }
                    });     
                };
                createCol();
                // End Create Elements
                // ----------------------------------------------
                let totalPoints = 0;
                // ---------------
                setTimeout(() => {
                    // -------------- Start Coding --------------
                    // Clicked Keyboard ---------------------------------------------------
                    document.addEventListener("keydown", (e) => {
                        // Any Key, Not (Enter , Delete) 
                        if (keyLetters.includes(e.key.toLowerCase())) {
                            if (boxNum < countCol) {
                                rowInputs[rowNum].childNodes[boxNum].textContent = e.key;
                                rowInputs[rowNum].childNodes[boxNum].classList.add("border");
                                boxNum++;
                            }
                        }
                        // Key (Delete) 
                        if (e.key.toLowerCase() === "backspace" || e.key.toLowerCase() === "delete") {
                            if (boxNum > 0) {
                                deleteLetters();
                            }
                        }
                        // Key (Enter)
                        if (e.key.toLowerCase() === "enter") {
                            if (rowNum < rowInputs.length) {
                                if (boxNum == countCol) {
                                    let arrWrite = [];
                                    rowInputs[rowNum].childNodes.forEach(w => {
                                        arrWrite.push(w.innerHTML.toLowerCase());
                                    });
                                    // ----------------
                                    if (words.includes(arrWrite.join(""))) {
                                        if (arrWrite.join("") == chosenWord) {
                                            trueAnswer();
                                        } else {
                                            falseAnswer();
                                        }
                                    } else {
                                        notInList();
                                    }
                                } else {
                                    notLetters();
                                }
                            }
                        }
                    });
                    // ---------------------------------------------------
                    // Clicked Buttons ---------------------------------------------------
                    // ------------------------
                    btnLetters.forEach(letter => {
                        letter.addEventListener("click", () => {
                            if (keyLetters.includes(letter.dataset.key) && letter.dataset.key != "enter" && letter.dataset.key != "delete") {
                                if (boxNum < countCol) {
                                    rowInputs[rowNum].childNodes[boxNum].textContent = letter.dataset.key;
                                    rowInputs[rowNum].childNodes[boxNum].classList.add("border");
                                    boxNum++;
                                }
                            }
                            // Key (Delete) 
                            if (letter.dataset.key === "delete") {
                                if (boxNum > 0) {
                                    deleteLetters();
                                    if (letter.dataset.key != "delete" && letter.dataset.key != "enter") {
                                        letter.className = "";
                                    }
                                }
                            }
                            // Key (Enter)
                            if (letter.dataset.key === "enter") {
                                if (rowNum < rowInputs.length) {
                                    if (boxNum == countCol) {
                                        let arrWrite = [];
                                        rowInputs[rowNum].childNodes.forEach(w => {
                                            arrWrite.push(w.innerHTML.toLowerCase());
                                        });
                                        // ----------------
                                        if (words.includes(arrWrite.join(""))) {
                                            if (arrWrite.join("") == chosenWord) {
                                                trueAnswer();
                                            } else {
                                                falseAnswer();
                                            }
                                        } else {
                                            notInList();
                                        }
                                    } else {
                                        notLetters();
                                    }
                                }
                            }
                        });
                    });
                    // -------------- End Coding --------------
                    // ------------------
                    // --------- Start Functions With clicked Enter Key ---------
                    // Delete Letters Function
                    function deleteLetters () {
                        boxNum--;
                        rowInputs[rowNum].childNodes[boxNum].textContent = "";
                        rowInputs[rowNum].childNodes[boxNum].classList.remove("border");
                    };
                    // -----------------------
                    // True Answer Function
                    function trueAnswer () {
                        rowInputs[rowNum].childNodes.forEach(w => {
                            w.classList.remove("false-color");
                            w.classList.add("true-color");
                            w.style.border = "0";
                        });
                        // Points Counter
                        if (rowNum == 0) {
                            points += 6;
                        } else if (rowNum == 1) {
                            points += 5;
                        } else if (rowNum == 2) {
                            points += 4;
                        } else if (rowNum == 3) {
                            points += 3;
                        } else if (rowNum == 4) {
                            points += 2;
                        } else if (rowNum == (rowInputs.length - 1)) {
                            points += 1;
                        } else {
                            points = 0;
                        }
                        setTimeout(() => {
                            gameFinish();
                        }, 1000);
                    };
                    // -----------------------
                    // False Answer Function
                    function falseAnswer () {
                        rowInputs[rowNum].childNodes.forEach((lWrite, iWrite) => {
                            if (chosenWord.split("").includes(lWrite.textContent)) {
                                if (iWrite == chosenWord.split("").indexOf(lWrite.textContent)) {
                                    lWrite.classList.add("true-color");
                                    lWrite.style.border = "0";
                                } else {
                                    lWrite.classList.add("t-f");
                                    lWrite.style.border = "0";
                                }
                            } else {
                                lWrite.classList.add("false-color");
                                lWrite.style.border = "0";
                            }
                            btnLetters.forEach(btn => {
                                if (lWrite.textContent == btn.dataset.key) {
                                    btn.className = lWrite.className;
                                }
                            });                    
                        });
                        boxNum = 0;
                        rowNum++;
                        failed();
                    };
                    // -----------------------
                    // Failed Game function
                    function failed () {
                        if (rowNum > (rowInputs.length - 1)) {
                            let lastRow = [];
                            rowInputs[rowInputs.length - 1].childNodes.forEach(w => {
                                lastRow.push(w.innerHTML.toLowerCase());
                            });
                            if (lastRow.join("") != chosenWord) {
                                setTimeout(() => {
                                    gameFinish();
                                }, 1000);
                            }
                        }  
                    };
                    // -----------------------
                    // Not In Word List Function
                    function notInList() {
                        animateWrong();
                        notList.innerHTML = "Not in word list";
                        notList.style.transform = "translate(-50%, 0)";
                        setTimeout(() => {
                            notList.style.transform = "translate(-50%, -100px)";                        
                        }, 1500);
                    };
                    // -----------------------
                    // Not Enough Letters Function
                    function notLetters() {
                        animateWrong();
                        notList.innerHTML = "Not enough letters"
                        notList.style.transform = "translate(-50%, 0)";
                        setTimeout(() => {
                            notList.style.transform = "translate(-50%, -100px)";                        
                        }, 1500);
                    };
                    // -----------------------
                    // Animate Wrong function 
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
                    // Create PopUp Game Finish Function
                    function gameFinish() {
                        // Variables
                        const mainDiv = document.querySelector(".content .game-finish"),
                            popUp = document.querySelector(".content .game-finish .popup"),
                            title = document.querySelector(".content .game-finish .popup h1"),
                            message = document.querySelector(".content .game-finish .popup h3"),
                            scoreMess = document.querySelector(".content .game-finish .popup p"),
                            btnNext = document.querySelector(".content .game-finish .popup button");
                        // Append Text Node and Add Classes 
                        if (points > 0) {
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
                        scoreMess.innerHTML = `You scored ${points} points`;
                        mainDiv.style.display = "flex";
                        popUp.style.display = "flex";
                        setTimeout(() => {
                            popUp.style.opacity = "1";
                        }, 100);
                        popUp.style.transform = "translateY(0)";
                        // Clicked Next BTN
                        document.onkeydown = (e) => {
                            if (e.key == " " || e.key == "Escape") {
                                nextGame();
                            }
                        }
                        btnNext.onclick = () => {
                            nextGame();
                        };
                        // -----------------------
                        // Next Game Function
                        function nextGame () {
                            // Sum Total Points 
                            totalPoints += points;
                            // Reset Counters
                            boxNum = 0;
                            rowNum = 0;
                            points = 0;
                            // Chosen Another Word
                            chose();
                            // Sum Columns Number
                            countColumns();
                            console.log(chosenWord)
                            // Reset Columns
                            rowInputs.forEach(w => {
                                w.innerHTML = "";
                            });
                            // Create New Columns
                            createCol();
                            // Hide PopUp 
                            mainDiv.style.display = "none";
                            popUp.style.display = "none";
                            popUp.style.opacity = "0";
                            popUp.style.transform = "translateY(500px)";
                            // Set BTN Classes
                            btnLetters.forEach(btn => {
                                if (btn.dataset.key != "delete" && btn.dataset.key != "enter") {
                                    btn.className = "";
                                }
                            });
                            // Show Result Finally
                            console.log(totalPoints);
                        };
                    };
                    // --------- End Functions With clicked Enter Key ---------
                }, 0);
            });   
        }, 0);
    };
    gamePlay();
    // -------------------------- End Game Play --------------------------
    // End Game Coding
};
game();
