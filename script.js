// let gameboard = [null, null, null, null, null, null, null, null, null];


const gameBoard = (function() {

    const gameBoard = {
        gameBoardArray: []
    };

    let moveTally = 1

    // cacheDOM
    let gameBoardDiv = document.querySelector('#gameboard');
    let player1Div = document.querySelector('#player1');
    let player2Div = document.querySelector('#player2');
    let moveBoxes = document.querySelectorAll('.move');
    let winMessage = document.querySelector('#winMessage');

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
        
        gameBoard.gameBoardArray[clickedBox.id] = moveSymbol;
        moveTally++;

        _render();
        _checkWin();
    };


    function _render() {
        for (let i = 0; i < 9; i++) {
            moveBoxes[i].textContent = gameBoard.gameBoardArray[i];
        };
    };


    function _checkWin() {
        let player1Win = ['❌','❌','❌'];
        let player2Win = ['⭕','⭕','⭕'];
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

        winningCombos.forEach((currentCombo) => {
            let currentCheck = [];

            currentCombo.forEach((curComPosition) => {
                currentCheck.push(gameBoard.gameBoardArray[curComPosition])
            });
            
            // Can't seem to make it console log here
            if (player1Win.toString() === currentCheck.toString()) {
                _gameOver('player1');
            };
            if (player2Win.toString() === currentCheck.toString()) {
                _gameOver('player2')
            };
        });

        
    };


    function _gameOver(winner) {
        gameBoardDiv.removeEventListener("click", _doMove);

        winMessage.className = 'show';
        winMessage.textContent = `${winner} Wins!!!`;

        console.log(`${winner} Wins!!!`);
        // logic to put some gameover message over the gameboard 
    };

})();