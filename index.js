const Gameboard = (function () {
 const board = ["", "", "", "", "", "", "", "", ""];

    const placeMark = (index, mark) => {
        if(board[index] == "") {
            board[index] = mark;
        }else {
            console.log("Already Taken");
        }
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

const gameController = (function () {
    let currentPlayer = player1;

    const playTurn = (index) => {
        Gameboard.placeMark(index, currentPlayer.symbol);

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    return { playTurn };
})();