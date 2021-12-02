const playerFactory = (name, symbol, playerDesignation) => { 
    //playerDesignation is supposed to connect the player object to either player1 or player2
    return { name, playerDesignation, timesWon: 0, };
};


const playerSelectScreen = (function() {
    
    // variables

    // cacheDOM

    // events

    // functions
    

})();




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
    let replayButton = document.querySelector('#replay');
    
    // events
    gameBoardDiv.addEventListener("click", _doMove);
    replayButton.addEventListener("click", _resetGame);
    
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
            
            if (moveTally == 10) return _gameOver('tie');

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

        const winP = document.createElement('p');

        // PRINTS 'ITS A TIE' 8 TIMES FOR SOME REASON
        
        if (winner == 'tie') {

            winP.innerHTML = `It's a <br> Tie!`;
            winMessage.insertBefore(winP, replayButton);
            winMessage.className = 'show';
        };

        winP.innerHTML = `${winner} <br> Wins!!!`;
        winMessage.insertBefore(winP, replayButton);
        winMessage.className = 'show';

    };


    function _resetGame () {
        winMessage.className = '';

    };

})();


