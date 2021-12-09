let player1 = {};
let player2 = {};


const playerFactory = (name, symbol) => { 
    //playerDesignation is supposed to connect the player object to either player1 or player2
    return {name, symbol, timesWon: 0};
};




const playerSelectScreen = (function() {
    
    // variables
    let playerName = ""; 
    let pickedSymbolDiv = "";
    let clickedCounter = 0;
    
    // cacheDOM
    function _cacheDom() {
        playerName = document.querySelector('#playerName');
        pickedSymbolDiv = document.querySelector('#pickSymbolDiv');
        player1Section = document.querySelector('#player1');
        player2Section = document.querySelector('#player2');
        playerScreenDiv = document.querySelector('#playerScreen'); 
    };
    _cacheDom();
    
    // events
    pickedSymbolDiv.addEventListener('click', _addPlayer);
    
    // functions
    function _addPlayer(e) {
        _cacheDom();
        
        let pickedSymbol = e.target.textContent;
        let playerDesignation = e.target.id;
       
        playerDesignation === 'X' ? player1 = playerFactory(playerName.value, pickedSymbol) : player2 = playerFactory(playerName.value, pickedSymbol);
        
        playerName.value = '';

        _insertPlayer();
    };
    
    function _insertPlayer() {
        player1Section.innerHTML = '';
        player2Section.innerHTML = '';

        const p1Header = document.createElement('h2');
        const p2Header = document.createElement('h2');
        const p1Symbol = document.createElement('span');
        const p2Symbol = document.createElement('span');
        const p1TW = document.createElement('p');
        const p2TW = document.createElement('p');

        p1Header.textContent = player1.name;
        p2Header.textContent = player2.name;
        p1Symbol.textContent = player1.symbol;
        p2Symbol.textContent = player2.symbol;
        p1TW.textContent = `Won ${player1.timesWon} Times `;
        p2TW.textContent = `Won ${player2.timesWon} Times `;
              

        player1Section.appendChild(p1Header);
        player2Section.appendChild(p2Header);
        player1Section.appendChild(p1Symbol);
        player2Section.appendChild(p2Symbol);
        player1Section.appendChild(p1TW);
        player2Section.appendChild(p2TW);
        
        clickedCounter++;
        console.log(clickedCounter);

        if (clickedCounter >= 2 && Number.isInteger(clickedCounter % 2)) return _removePlayerSelection();
    };

    function _removePlayerSelection() {

        if (!player1.name && !player2.name) return alert("Please fill in both players' names");
        

        playerScreenDiv.classList.toggle('hide')
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
                _gameOver(player1);
            };
            if (player2Win.toString() === currentCheck.toString()) {
                _gameOver(player2);
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
            winP.innerHTML = `${winner.name} <br> Wins!!!`;
            winMessage.insertBefore(winP, replayButton);
            winner.timesWon++;
            player1Div.lastElementChild.textContent = `Won ${player1.timesWon} Times`;
            player2Div.lastElementChild.textContent = `Won ${player2.timesWon} Times`;
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


