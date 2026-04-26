const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const placeMark = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { board, placeMark, reset };
})();

class Player {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
    }
}

const GameController = (function () {
    let player1;
    let player2;
    let currentPlayer;
    let gameOver = false;

    const checkWinner = () => {
        const b = Gameboard.board;
        const winPatterns = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        return winPatterns.some(pattern => {
            const [a, b1, c] = pattern;
            return b[a] && b[a] === b[b1] && b[a] === b[c];
        });
    };

    const checkTie = () => Gameboard.board.every(cell => cell !== "");

    const setPlayers = (name1, name2) => {
        player1 = new Player(name1 || "Player 1", "X");
        player2 = new Player(name2 || "Player 2", "O");
        currentPlayer = player1;
        gameOver = false;
    };

    const playTurn = (index) => {
        if (!currentPlayer) return "Click Start first!"; // ✅ moved to top
        if (gameOver) return "Game over";

        const success = Gameboard.placeMark(index, currentPlayer.mark);
        if (!success) return "Invalid move";

        if (checkWinner()) {
            gameOver = true;
            return `${currentPlayer.name} wins!`;
        }

        if (checkTie()) {
            gameOver = true;
            return "It's a tie!";
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        return `${currentPlayer.name}'s turn`;
    };

    const resetGame = () => {
        gameOver = false;
        currentPlayer = player1;
        Gameboard.reset();
    };

    return { playTurn, resetGame, setPlayers };
})();

const DisplayController = (function () {
    const cells = document.querySelectorAll(".cell");

    const render = () => {
        const board = Gameboard.board;
        cells.forEach((cell, index) => {
            cell.textContent = board[index];

            if (board[index] === "X") {
                cell.style.color = "#ff6b6b";
            } else if (board[index] === "O") {
                cell.style.color = "#4ecdc4";
            } else {
                cell.style.color = "white";
            }

            if (board[index] !== "") {
                cell.style.pointerEvents = "none";
                cell.style.opacity = "0.7";
            } else {
                cell.style.pointerEvents = "auto";
                cell.style.opacity = "1";
            }
        });
    };

    return { render };
})();

// ✅ Store return value of playTurn so status actually shows results
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", () => {
        const index = Number(cell.dataset.index);
        const result = GameController.playTurn(index); // ✅ was missing assignment
        DisplayController.render();
        document.getElementById("status").textContent = result; // ✅ removed the overwrite
    });
});

document.getElementById("restart").addEventListener("click", () => {
    GameController.resetGame();
    DisplayController.render();
    document.getElementById("status").textContent = "Game reset. Player 1's turn.";
});

document.getElementById("start").addEventListener("click", () => {
    const name1 = document.getElementById("player1").value;
    const name2 = document.getElementById("player2").value;

    GameController.setPlayers(name1, name2);
    Gameboard.reset();         // ✅ clear board on new game
    DisplayController.render();

    document.getElementById("status").textContent = `${name1 || "Player 1"} vs ${name2 || "Player 2"} — Player 1's turn`;
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
});