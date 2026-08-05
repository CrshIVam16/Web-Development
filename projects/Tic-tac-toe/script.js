// const box = document.querySelectorAll(".box");
// const h1 = document.getElementById("h1");
// const resetBtn = document.querySelector(".btn");

// let count = 0;

// let currentval = "X";
// let gameOver = false;

// const win_conditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
// ];

// function start() {
//     for (const [a, b, c] of win_conditions) {
//         const v0 = box[a].innerText;
//         const v1 = box[b].innerText;
//         const v2 = box[c].innerText;
//         // console.log(a, v0, b, v1, c, v2);

//         if (v0 !== "" && v0 === v1 && v1 === v2) {
//             box[a].classList.add("winnerClass")
//             box[b].classList.add("winnerClass")
//             box[c].classList.add("winnerClass")
//             return v0; // winner symbol
//         }
//     }
//     return null;
// }

// function eventStart() {
//     box.forEach((item) => {
//         item.addEventListener("click", () => {
//             if (gameOver) return;

//             if (item.textContent.trim() === "") {
//                 item.innerText = currentval;
//                 const winner = start();
//                 count++;
//                 if (winner) {
//                     gameOver = true;
//                     // alert(`${winner} is Winner...`);
//                     h1.innerText = `${winner} is Winner...`;
//                     return;
//                 }
//                 if (count === 9) {
//                     gameOver = true;
//                     // alert(`Match Draw...`);
//                     h1.innerText = `Match Draw...`;
//                     return;
//                 }
//                 currentval = (currentval === "X") ? "O" : "X";
//             }
//         });
//     });
// }
// eventStart();

// function resetGame() {
//     // box.forEach(cell => cell.innerText = "");
//     for (const [a, b, c] of win_conditions) {
//         box[a].innerText = "";
//         box[a].classList.remove("winnerClass")
//         box[b].innerText = "";
//         box[b].classList.remove("winnerClass")
//         box[c].innerText = "";
//         box[c].classList.remove("winnerClass")
//     }
//     currentval = "X";
//     gameOver = false;
//     h1.innerText = `Tic-Tac-Toe`;
// }
// resetBtn.addEventListener("click", resetGame);

const box = document.querySelectorAll(".box");
const h1 = document.getElementById("h1");
const resetBtn = document.querySelector(".btn");

const checkbc = document.getElementById("modeToggle"); // <-- checkbox id you used

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

function getWinnerFromBoard(bd) {
    for (const [a, b, c] of win_conditions) {
        const v0 = bd[a];
        const v1 = bd[b];
        const v2 = bd[c];
        if (v0 !== "" && v0 === v1 && v1 === v2) return v0;
    }
    return null;
}

function start() {
    // keep your original behavior (reads DOM)
    for (const [a, b, c] of win_conditions) {
        const v0 = box[a].innerText;
        const v1 = box[b].innerText;
        const v2 = box[c].innerText;

        if (v0 !== "" && v0 === v1 && v1 === v2) {
            box[a].classList.add("winnerClass");
            box[b].classList.add("winnerClass");
            box[c].classList.add("winnerClass");
            return v0;
        }
    }
    return null;
}

// ---------- MINIMAX (new) ----------
function minimax(board, isMaximizing) {
    const winner = getWinnerFromBoard(board);
    if (winner === "O") return 10;
    if (winner === "X") return -10;
    if (!board.includes("")) return 0;

    const empties = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") empties.push(i);
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (const idx of empties) {
            board[idx] = "O";
            const score = minimax(board, false);
            board[idx] = "";
            bestScore = Math.max(bestScore, score);
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (const idx of empties) {
            board[idx] = "X";
            const score = minimax(board, true);
            board[idx] = "";
            bestScore = Math.min(bestScore, score);
        }
        return bestScore;
    }
}

function bestMoveMinimax(board) {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "O";
            const score = minimax(board, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function domToBoard() {
    return Array.from(box).map((cell) => cell.innerText.trim());
}

function playComputerMove() {
    // computer plays only if checkbox ticked and game not over
    if (!checkbc || !checkbc.checked) return;
    if (gameOver) return;

    // computer is O, human is X
    const board = domToBoard();

    // if game already has winner/draw
    const winner = getWinnerFromBoard(board);
    if (winner || !board.includes("")) return;

    const idx = bestMoveMinimax(board);
    if (idx === -1) return;

    box[idx].innerText = "O";
    const w = start();
    count++;

    if (w) {
        gameOver = true;
        h1.innerText = `${w} is Winner...`;
        return;
    }
    if (count === 9) {
        gameOver = true;
        h1.innerText = `Match Draw...`;
        return;
    }

    currentval = "X";
}
// ---------- end MINIMAX ----------

function eventStart() {
    box.forEach((item) => {
        item.addEventListener("click", () => {
            if (gameOver) return;
            if (!checkbc || !checkbc.checked) {
                // -------- friend mode: keep your logic --------
                if (item.textContent.trim() === "") {
                    item.innerText = currentval;
                    const winner = start();
                    count++;
                    if (winner) {
                        gameOver = true;
                        h1.innerText = `${winner} is Winner...`;
                        return;
                    }
                    if (count === 9) {
                        gameOver = true;
                        h1.innerText = `Match Draw...`;
                        return;
                    }
                    currentval = (currentval === "X") ? "O" : "X";
                }
            } else {
                // -------- computer mode --------
                // human is X, computer is O
                if (currentval !== "X") return; // wait for computer
                if (item.textContent.trim() !== "") return;

                item.innerText = "X";
                const winner = start();
                count++;

                if (winner) {
                    gameOver = true;
                    h1.innerText = `${winner} is Winner...`;
                    return;
                }
                if (count === 9) {
                    gameOver = true;
                    h1.innerText = `Match Draw...`;
                    return;
                }

                currentval = "O";
                setTimeout(() => {
                    playComputerMove();
                }, 1000);

            }
        });
    });
}
eventStart();

function resetGame() {
    for (const [a, b, c] of win_conditions) {
        box[a].innerText = "";
        box[a].classList.remove("winnerClass");
        box[b].innerText = "";
        box[b].classList.remove("winnerClass");
        box[c].innerText = "";
        box[c].classList.remove("winnerClass");
    }
    currentval = "X";
    gameOver = false;
    count = 0; // <-- (important bug fix) reset move count
    h1.innerText = `Tic-Tac-Toe`;
}
resetBtn.addEventListener("click", resetGame);
