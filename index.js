const Gameboard = (function () {
 const board = ["", "", "", "", "", "", "", "", ""];

    const placeMark = (index, mark) => {
        if(board[index] === "") {
            board[index] = mark;
            return true
        }
        return false;
    }
    return { board, placeMark };
})();
   
class Player {
    constructor(name, mark){
        this.name = name;
        this.mark = mark;
    }
};

const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

const GameController = (function () {
    let currentPlayer = player1;

   
    const playTurn = (index) => {
    const success = Gameboard.placeMark(index, currentPlayer.mark)
    if(!success) return;

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const checkWinner = () => {
    const b = Gameboard.board;

     const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return winPatterns.some(patter => {
        const [a, b1, c] = pattern;
        return b[a] && b[a] === b[b1] && b[a] === b[c];
    });
}; 
    return { playTurn };
})();

const checkWinner = () => {
    const b = Gameboard.board;

    return winPatters.some(patter => {
        const [a, b1, c] = pattern;
        return b[a] && b[a] === b[b1] && b[a] === b[c];
    });
};

const DisplayController = (function () {
    const cells = document.querySelectorAll(".cell");

    const render = () => {
        const board = Gameboard.board;

        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };
    return { render };
})();

document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", () => {

        const index = cell.dataset.index;

        GameController.playTurn(index);
        DisplayController.render();
    });
});