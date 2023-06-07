let board = [];

function startGame(boardX, boardY) {
  const numberOfBombs = Math.round(boardX * boardY * 0.15);

  for (let i = 0; i < boardY; i++) {
    board.push([]);
    for (let j = 0; j < boardX; j++) {
      board[i].push("x");
    }
  }

  // Place bombs randomly on grid.
  for (let i = 0; i < numberOfBombs; i++) {
    let randomX = Math.floor(Math.random() * boardX);
    let randomY = Math.floor(Math.random() * boardY);
    // If there is already a bomb at this location,try random placing bomb again.
    if (board[randomY][randomX] === "B") {
      i--;
      continue;
    }

    board[randomY][randomX] = "B";
  }

  let gameOver = false;

  while (!gameOver) {
    // Print the board again.
    console.log(board.map((row) => row.join(" ")).join("\n"));
    let validInput = false;

    while (!validInput) {
      let userInput = prompt("Enter your move: i.e 1,5").split(",");
      if (userInput.length !== 2) {
        //Invalid user input, not two numbers separated by a comma.
        console.log("invalid input");
        continue;
      }

      let y = parseInt(userInput[0] - 1);
      let x = parseInt(userInput[1] - 1);

      // Check if the the userinput is a number and within the play area..
      if (
        isNaN(x) ||
        isNaN(y) ||
        x < 0 ||
        x >= boardX ||
        y < 0 ||
        y >= boardY
      ) {
        console.log("invalid input");
        continue;
      }

      // User hit tha bomb! aii karamba!
      if (board[y][x] === "B") {
        console.log("BOOM! Game Over...");
        validInput = true;
        gameOver = true;
      } else {
        console.log("Safe! Continue playing.");
        let count = countAdjacentBombs(x, y, boardX, boardY);
        board[y][x] = count === 0 ? "O" : count;
        validInput = true;
      }
    }
  }
}
function countAdjacentBombs(column, row, boardWidth, boardHeight) {
  let bombCount = 0;

  // The following two loops iterate over each cell surrounding the selected one
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      // Skip the selected cell itself
      let newColumn = column + y;
      // Skip the cell.
      let newRow = row + x;

      // Check if the cell is within the board
      let isWithinBoardHorizontally = newColumn >= 0 && newColumn < boardWidth;
      let isWithinBoardVertically = newRow >= 0 && newRow < boardHeight;
      // Check if the cell contains a bomb
      let isBomb = board[newRow][newColumn] === "B";

      // Only increase the bomb count if the cell is within the board and contains a bomb
      // aii
      if (isWithinBoardHorizontally && isWithinBoardVertically && isBomb) {
        bombCount++;
      }
    }
  }
  return bombCount;
}

startGame(9, 5);
