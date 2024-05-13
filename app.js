let body = document.querySelector("body");
let boxes = document.querySelectorAll(".box");
let mainBox = document.querySelector(".boxes");
let isRunning = false;

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

function startGame() {
    let level = 1;
    let seq = [];
    seq.push(randBoxBlink(boxes));
    let infoLine = document.querySelector("h2");
    infoLine.innerText = `Level ${level}`;
    let count = 0;
    mainBox.addEventListener("click", function (event) {
        if (event.target.id[3] == seq[count++]) {
            console.log("right box")
        } else {
            function gameOver() {
                bodyBlink(body);
            };
            let id = setInterval(gameOver, 200);
            setTimeout(() => { clearInterval(id) }, 400);
            infoLine.innerText = `Game Over! Your Score was ${level - 1}\nPress any Key to Restart the Game`;
            count--;
            isRunning = false;
            seq = [];
            level = 1;
        }

        if (count == seq.length) {
            infoLine.innerText = `Level ${++level}`;
            seq.push(randBoxBlink(boxes));
            count = 0;
        }
    })
}

body.addEventListener("keypress", () => {
    if (!isRunning) {
        isRunning = true;
        startGame();
    }
})