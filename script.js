const playerFactory = (playerDesignation, name, symbol) => { 
    //playerDesignation is supposed to connect the player object to either player1 or player2
    return console.log(playerDesignation = { name, symbol, timesWon: 0, });
};


const playerSelectScreen = (function() {
    
    // variables
    let playerName = ""; 
    let pickedSymbolDiv = "";
    
    // cacheDOM
    function _cacheDom() {
        playerName = document.querySelector('#playerName').value;
        pickedSymbolDiv = document.querySelector('#pickSymbolDiv');
    };
    _cacheDom();
    
    // events
    pickedSymbolDiv.addEventListener('click', _addPlayer);
    
    // functions
    function _addPlayer(e) {
        _cacheDom();
        
        let pickedSymbol = e.target.textContent;
        let playerDesignation = e.target.id;
        
        playerFactory( playerDesignation, playerName, pickedSymbol);
        
    };
    


    

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

        if (moveTally == 10) return _gameOver('tie');

        winningCombos.forEach((currentCombo) => {
            let currentCheck = [];

            currentCombo.forEach((curComPosition) => {
                currentCheck.push(gameBoard.gameBoardArray[curComPosition])
            });
            
            if (player1Win.toString() === currentCheck.toString()) {
                _gameOver('player1');
            };
            if (player2Win.toString() === currentCheck.toString()) {
                _gameOver('player2')
            };
        });

        
    };


    function _gameOver(winner) {
        
        
        // also needs a ++ to the win count of the player
        const winP = document.createElement('p');
        
        if (winner == 'tie') {
            winP.innerHTML = `It's a <br> Tie!`;
            winMessage.insertBefore(winP, replayButton);
            return winMessage.className = 'show';
        } else {
            winP.innerHTML = `${winner} <br> Wins!!!`;
            winMessage.insertBefore(winP, replayButton);
            return winMessage.className = 'show';
        };  

    };


    function _resetGame () {
        winMessage.className = '';
        winMessage.removeChild(winMessage.firstElementChild);
        gameBoard.gameBoardArray = [];
        moveTally = 1;
        _render();
    };

})();


