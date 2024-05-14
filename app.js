let body = document.querySelector("body");
let boxes = document.querySelectorAll(".box");
let mainBox = document.querySelector(".boxes");
let isRunning = false;
let level = 1;
let seq = [];
let count = 0;
let infoLine = document.querySelector("h2");
let isAndroid = false;

function boxBlink(box) {
    defaultColor = box.style.backgroundColor;
    box.style.backgroundColor = "black";
    setTimeout(() => {
        box.style.backgroundColor = defaultColor;
    }, 100)
}
function boxClick(box) {
    defaultOpacity = box.style.opacity;
    box.style.opacity = 0.8;
    setTimeout(() => {
        box.style.opacity = defaultColor;
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
    boxClick(event.target);
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
    if (!isAndroid) {
        mainBox.removeEventListener("click", clickHandler);
    } else {
        mainBox.removeEventListener("touchstart", clickHandler);
    }
}

function startGame() {
    seq.push(randBoxBlink(boxes));
    infoLine.innerText = `Level ${level}`;
    if (!isAndroid) {
        mainBox.addEventListener("click", clickHandler);
    } else {
        mainBox.addEventListener("touchstart", clickHandler);
    }
}

body.addEventListener("keypress", () => {
    if (!isRunning) {
        isRunning = true;
        startGame();
    }
})
body.addEventListener("touchstart", () => {
    isAndroid = true;
    if (!isRunning) {
        isRunning = true;
        startGame();
    }
})