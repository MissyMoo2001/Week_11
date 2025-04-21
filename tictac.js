const grid = document.getElementById("grid");
  const turnIndicator = document.getElementById("turn-indicator");
  const alertBox = document.getElementById("alert-box");

  let board = Array(9).fill(null);
  let currentPlayer = "X";
  let gameOver = false;
    //game starts with empty board, x always goes first
  function createGrid() {
    const grid = document.getElementById("grid"); console.log("Grid element:", grid); // Debug
    grid.innerHTML = "";
    board.forEach((value, index) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = value || "";
      cell.onclick = () => handleMove(index);
      grid.appendChild(cell);
      console.log("Added cell:", cell);
    });
  }
  //java script automatically switches turns for the players, three possible endings based on final turn(unless player gets three before board is full)
  function handleMove(index) {
    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    createGrid();

    if (checkWinner()) {
      showAlert(`${currentPlayer} wins!`, "success");
      gameOver = true;
    } else if (board.every(cell => cell)) {
      showAlert(`It's a draw!`, "warning");
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      turnIndicator.textContent = `${currentPlayer}'s Turn`;
    }
  }

  function checkWinner() {
    const combos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return combos.some(([a, b, c]) =>
      board[a] && board[a] === board[b] && board[a] === board[c]
    );
  }
  //final function for the button that resets the entire board for an eternity of fun
  function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    turnIndicator.textContent = "X's Turn";
    alertBox.innerHTML = "";
    createGrid();
  }

  function showAlert(message, type) {
    alertBox.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${message}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  }

  // Initialize the game
  createGrid();