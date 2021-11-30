// let gameboard = [null, null, null, null, null, null, null, null, null];


const gameBoard = (function() {

    const gameBoard = {
        gameBoard: []
    };

    let moveTally = 1

    // cacheDOM
    let gameBoardDiv = document.querySelector('#gameboard');
    let player1 = document.querySelector('#player1');
    let player2 = document.querySelector('#player2');
    let moveBoxes = document.querySelectorAll('.move');

    // events
    gameBoardDiv.addEventListener("click", _doMove);

    // functions
    function _doMove(e) {
        let moveSymbol = '❌';
        let clickedBox = e.target;
        
        if (Number.isInteger(moveTally/2)) {
            moveSymbol = '⭕';
        };
        
        if (clickedBox.textContent) return;
        
        gameBoard.gameBoard[clickedBox.id] = moveSymbol;
        moveTally++;

        _render();
        _checkWin();
    };


    function _render() {
        for (let i = 0; i <= 9; i++) {
            moveBoxes[i].textContent = gameBoard.gameBoard[i];
        };
    };

    function _checkWin() {
        let winningCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        console.log(winningCombos);

        // for (let i = 0; i < 9; i++) {
        //     let currentWinningCombo = winningCombos[i];
        //     console.log(currentWinningCombo);
        //     // for (let i = 0; i < 4; i++) {
        //     // }
        // };
    };

})();