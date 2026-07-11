const box = document.querySelectorAll(".box");
const h1 = document.getElementById("h1");
const resetBtn = document.querySelector(".btn");

let count = 0;

let currentval = "X";
let gameOver = false;

const win_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function start() {
    for (const [a, b, c] of win_conditions) {
        const v0 = box[a].innerText;
        const v1 = box[b].innerText;
        const v2 = box[c].innerText;
        // console.log(a, v0, b, v1, c, v2);

        if (v0 !== "" && v0 === v1 && v1 === v2) {
            box[a].classList.add("winnerClass")
            box[b].classList.add("winnerClass")
            box[c].classList.add("winnerClass")
            return v0; // winner symbol
        }
    }
    return null;
}

function eventStart() {
    box.forEach((item) => {
        item.addEventListener("click", () => {
            if (gameOver) return;

            if (item.textContent.trim() === "") {
                item.innerText = currentval;
                const winner = start();
                count++;
                if (winner) {
                    gameOver = true;
                    // alert(`${winner} is Winner...`);
                    h1.innerText = `${winner} is Winner...`;
                    return;
                }
                if (count === 9) {
                    gameOver = true;
                    // alert(`Match Draw...`);
                    h1.innerText = `Match Draw...`;
                    return;
                }
                currentval = (currentval === "X") ? "O" : "X";
            }
        });
    });
}
eventStart();

function resetGame() {
    // box.forEach(cell => cell.innerText = "");
    for (const [a, b, c] of win_conditions) {
        box[a].innerText = "";
        box[a].classList.remove("winnerClass")
        box[b].innerText = "";
        box[b].classList.remove("winnerClass")
        box[c].innerText = "";
        box[c].classList.remove("winnerClass")
    }
    currentval = "X";
    gameOver = false;
    h1.innerText = `Tic-Tac-Toe`;
}
resetBtn.addEventListener("click", resetGame);

