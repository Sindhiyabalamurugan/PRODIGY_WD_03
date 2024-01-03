let player1Name = '';
let player2Name = '';
let currentPlayer = '';
let gameMode = '';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function selectMode(mode) {
    gameMode = mode;
    document.querySelector('.mode-selection').style.display = 'none';
    document.getElementById('player2').style.display = mode === 'two' ? 'block' : 'none';
    document.querySelector('.player-input').style.display = 'block';
}

function startGame() {
    player1Name = document.getElementById('player1').value;
    player2Name = document.getElementById('player2').value;
    
    if (gameMode === 'single' && player1Name) {
        player2Name = 'Computer';
    } else if (gameMode === 'two' && player1Name && player2Name) {
        // Continue as is
    } else {
        alert('Please enter names for both players to start the game.');
        return;
    }
    
    document.querySelector('.player-input').style.display = 'none';
    document.querySelector('.game-container').style.display = 'grid';
    gameActive = true;
    currentPlayer = 'X';
    renderBoard();
    
    if (gameMode === 'single' && currentPlayer === 'O') {
        // Computer makes the first move in single-player mode
        makeComputerMove();
    }
}

// ... (rest of the JavaScript code remains the same)


function handleClick(index) {
    if (gameState[index] === '' && gameActive) {
        gameState[index] = currentPlayer;
        renderBoard();
        
        if (checkWinner()) {
            alert(`${currentPlayer === 'X' ? player1Name : player2Name} wins!`);
            resetGame();
            return;
        }
        
        if (!gameState.includes('')) {
            alert('Game ended in a draw!');
            resetGame();
            return;
        }
        
        if (gameMode === 'single' && currentPlayer === 'X' && gameActive) {
            makeComputerMove();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function makeComputerMove() {
    // Logic for the computer's move (randomly select an empty cell)
    const emptyCells = gameState.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);
    
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        gameState[emptyCells[randomIndex]] = 'O';
        renderBoard();
        
        if (checkWinner()) {
            alert(`${player2Name} wins!`);
            resetGame();
            return;
        }
        
        if (!gameState.includes('')) {
            alert('Game ended in a draw!');
            resetGame();
            return;
        }
        
        currentPlayer = 'X';
    }
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
    // Logic to check for a winner (as provided in the previous answers)
}

function renderBoard() {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = '';
    
    for (let i = 0; i < gameState.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = gameState[i];
        cell.onclick = () => handleClick(i);
        gameContainer.appendChild(cell);
    }
    // Logic to render the game board (as provided in the previous answers)
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    renderBoard();
}
