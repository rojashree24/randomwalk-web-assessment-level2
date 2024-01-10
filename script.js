let board = ["", "", "", "", "", "", "", "", ""]; // Represents the game board
let currentPlayer = "X"; // Represents the current player ("X" or "O")
let gameActive = true; // Indicates if the game is still active
let xWins = 0; // Keeps track of the number of wins for player "X"
let oWins = 0; // Keeps track of the number of wins for player "O"

// Represents the winning conditions for the game
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Selects all the cells on the game board
const cells = document.querySelectorAll(".cell");

// Retrieves the status element, restart button, and win count elements
const status = document.getElementById("status");
const restartButton = document.getElementById("restart");
const xWinsElement = document.getElementById("x-wins");
const oWinsElement = document.getElementById("o-wins");

// Adds a click event listener to each cell on the game board
cells.forEach((cell) => cell.addEventListener("click", handleMove));

function handleMove(index) {
  // Check if the game is not active or if the cell is already filled
  if (!gameActive || board[index] !== "") return;

  // Set the current player's symbol on the board and update the cell's text content
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  // Check if the current player has won
  if (checkWin()) {
    gameActive = false;
    updateStatus(`${currentPlayer} wins!`);
    updateScoreboard(currentPlayer);
  }
  // Check if it's a draw
  else if (checkDraw()) {
    gameActive = false;
    updateStatus("It's a draw!");
  }
  // If no winner or draw, switch to the next player's turn
  else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`It's ${currentPlayer}'s turn`);
  }
}

function checkWin() {
  // Check all winning conditions
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    // If the symbols in the winning condition match and are not empty, return true
    if (board[a] === board[b] && board[a] === board[c] && board[a] !== "") {
      return true;
    }
  }
  // If no winning condition is met, return false
  return false;
}

function checkDraw() {
  // If the board does not include any empty cells, return true
  return !board.includes("");
}

function updateStatus(message) {
  // Update the status element with the provided message
  status.textContent = message;
}

function updateScoreboard(player) {
  // Update the win count for the respective player and update the scoreboard element
  if (player === "X") {
    xWins++;
    xWinsElement.textContent = `Player 1[X]: ${xWins}`;
  } else {
    oWins++;
    oWinsElement.textContent = `Player 2[O]: ${oWins}`;
  }
}

function restartGame() {
  // Reset the board to empty
  board = ["", "", "", "", "", "", "", "", ""];
  // Set the current player to "X"
  currentPlayer = "X";
  // Set the game to active
  gameActive = true;
  // Clear the text content of all cells on the board
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  // Update the status with the current player's turn
  updateStatus(`It's ${currentPlayer}'s turn`);
}

// Add event listener to the restart button to call the restartGame function
restartButton.addEventListener("click", restartGame);

// Update the status with the current player's turn
updateStatus(`It's ${currentPlayer}'s turn`);
