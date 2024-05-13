let body = document.querySelector("body");
let boxes = document.querySelectorAll(".box");
let mainBox = document.querySelector(".boxes");
let isRunning = false;
let level = 1;
let seq = [];
let count = 0;
let infoLine = document.querySelector("h2");

function boxBlink(box) {
    defaultColor = box.style.backgroundColor;
    box.style.backgroundColor = "white";
    setTimeout(() => {
        box.style.backgroundColor = defaultColor;
    }, 100)
}
function bodyBlink(body) {
    defaultColor = body.style.backgroundColor;
    body.style.backgroundColor = "red";
    setTimeout(() => {
        body.style.backgroundColor = defaultColor;
    }, 100)
}

function randBoxBlink(boxColl) {
    let randno = Math.floor(Math.random() * 4);
    boxBlink(boxColl[randno]);
    return randno;
}

function clickHandler(event) {
    if (event.target.id[3] == seq[count++]) {
        console.log("right box")
    } else {
        function gameOver() {
            bodyBlink(body);
        };
        let id = setInterval(gameOver, 200);
        setTimeout(() => { clearInterval(id) }, 400);
        infoLine.innerText = `Game Over! Your Score was ${level - 1}\nPress any Key to Restart the Game`;
        console.log("HERES THE BUG");
        count--;
        resetGame();
    }

    if (count == seq.length && isRunning) {
        infoLine.innerText = `Level ${++level}`;
        seq.push(randBoxBlink(boxes));
        count = 0;
    }
}

function resetGame() {
    isRunning = false;
    seq = [];
    level = 1;
    count = 0;
    mainBox.removeEventListener("click", clickHandler);
}

function startGame() {
    seq.push(randBoxBlink(boxes));
    infoLine.innerText = `Level ${level}`;
    mainBox.addEventListener("click", clickHandler);
}

body.addEventListener("keypress", () => {
    if (!isRunning) {
        isRunning = true;
        startGame();
    }
})