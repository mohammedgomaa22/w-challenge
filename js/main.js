// Light and Dark Mode
const lightAndDark = () => {
    const btnChange = document.querySelector(".mode"),
        mode = document.querySelector(".mode i"),
        root = document.querySelector(":root");
    // -----------------
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
    // // High Color Mode
    // if (document.querySelector(".high-color input:checked")) {
    //     console.log("yes");
    // } else {
    //     document.querySelector(".high-color input").setAttribute("checked", "");
    //     root.style.setProperty('--green-color', 'blue');
    //     console.log(document.querySelector(".high-color input"));
    // }
};
lightAndDark();
// ------------------------------------------
const toggler = () => {
    const nav = document.querySelector(".side-nav .nav");
    // -----------

    document.body.addEventListener(("click"), (e) => {
        if (e.target.classList.contains("toggle")) {
            nav.classList.toggle("show-side");
        } else {
            nav.classList.remove("show-side");
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
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------
const game = () => {
    // Start Vars
    const rowInputs = document.querySelectorAll(".inputs .row-i");
    // Words
    const words = ["able", "acid", "aged", "also", "area", "army", "away", "baby", "back", "ball", "actor", "again", "alert", "allow", "argue", "aware", "beach", "bring", "carry", "clear", "abroad", "casual", "around", "couple", "accept", "caught", "arrive", "course"];
    // const any = ["actor", "again", "alert", "allow", "argue", "aware", "beach", "bring", "carry", "clear", "abroad", "casual", "around", "couple", "accept", "caught", "arrive", "course"];
    function chose () {
        return chosenWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
    }
    chose();
    function countColumns () {
        return countCol = chosenWord.length;
    };
    countColumns();
    // End Vars
    console.log(chosenWord);
    // ----------------------------------------------
    // Start Create Elements
    // Try Of Number
    document.querySelector(".info .try-num").innerHTML = `Guess the W | Challenge in ${rowInputs.length} tries.`;
    // Columns 
    function createCol () {
        rowInputs.forEach(ele => {
            ele.style.gridTemplateColumns = `repeat(${countCol}, 1fr)`;
            for (let i = 0; i < countCol; i++) {
                const colInputs = document.createElement("span");
                // add classes 
                colInputs.className = "i";
                ele.appendChild(colInputs);
            }
        });     
    };
    createCol();
    // End Create Elements
    // -------------------------- Start GamePlay --------------------------
    let totalPoints = 0;
    // ---------------
    setTimeout(() => {
        // -----------------------------------
        // -------------- Start Var -------------- 
        let boxNum = 0;
        let rowNum = 0;
        let points = 0;
        let notList = document.querySelector(".not-in-list");
        // -------------- End Var --------------
        // ------------------------
        // -------------- Start Coding --------------
        document.addEventListener("click", (e) => {
            // Any Key, Not (Enter , Delete) 
            if (e.target.className === "l" && e.target.dataset.key != "enter" && e.target.dataset.key != "delete") {
                if (boxNum < countCol) {
                    rowInputs[rowNum].childNodes[boxNum].textContent = e.target.dataset.key;
                    rowInputs[rowNum].childNodes[boxNum].classList.add("border");
                    boxNum++;
                }
            }
            // Key (Delete) 
            if (e.target.dataset.key === "delete") {
                if (boxNum > 0) {
                    deleteLetters();
                }
            }
            // Key (Enter)
            if (e.target.dataset.key === "enter") {
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
                if (chosenWord.split("").includes(lWrite.innerHTML)) {
                    if (iWrite == chosenWord.split("").indexOf(lWrite.innerHTML)) {
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
        function notInList () {
            notList.innerHTML = "Not in word list";
            notList.style.transform = "translate(-50%, 0)";
            setTimeout(() => {
                notList.style.transform = "translate(-50%, -100px)";                        
            }, 1500);
        };
        // -----------------------
        // Not Enough Letters Function
        function notLetters () {
            notList.innerHTML = "Not enough letters"
            notList.style.transform = "translate(-50%, 0)";
            setTimeout(() => {
                notList.style.transform = "translate(-50%, -100px)";                        
            }, 1500);
        };
        // -----------------------
        // Create PopUp Game Finish Function
        function gameFinish() {
            const mainDiv = document.querySelector(".content .game-finish");
            const popUp = document.querySelector(".content .game-finish .popup");
            const title = document.querySelector(".content .game-finish .popup h1");
            const message = document.querySelector(".content .game-finish .popup h3");
            const scoreMess = document.querySelector(".content .game-finish .popup p");
            const btnNext = document.querySelector(".content .game-finish .popup button");
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
            // Events
            btnNext.onclick = () => {
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
                // Show Result Finally
                console.log("done");
                console.log(totalPoints);
            };
        };
        // --------- End Functions With clicked Enter Key ---------
    }, 0);
    // -------------------------- End GamePlay --------------------------
};
game();