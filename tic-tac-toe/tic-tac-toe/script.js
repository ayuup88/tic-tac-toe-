const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const newGameBtn = document.getElementById("newGameBtn");

const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");


let currentPlayer = "X";

let gameActive = true;

let gameState = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
];


const winningPatterns = [

  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]

];


/* =========================
   CELL CLICK
========================= */

function handleCellClick(event) {

  const cell = event.target;

  const index = Number(cell.dataset.index);


  // Stop if game is over

  if (!gameActive) {
    return;
  }


  // Stop if cell already has X or O

  if (gameState[index] !== "") {
    return;
  }


  // Add player's move

  gameState[index] = currentPlayer;

  cell.textContent = currentPlayer;


  // Add color class

  cell.classList.add(
    currentPlayer.toLowerCase()
  );


  checkResult();

}


/* =========================
   CHECK WIN / DRAW
========================= */

function checkResult() {

  let winningPattern = null;


  // Check all winning patterns

  for (const pattern of winningPatterns) {

    const [a, b, c] = pattern;


    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {

      winningPattern = pattern;

      break;
    }

  }


  // =========================
  // PLAYER WINS
  // =========================

  if (winningPattern) {

    gameActive = false;


    // Highlight winning cells

    winningPattern.forEach(index => {

      cells[index].classList.add("winner");

    });


    // Show result screen after
    // a short delay

    setTimeout(() => {

      showResult(
        "win",
        currentPlayer
      );

    }, 700);


    return;
  }


  // =========================
  // DRAW
  // =========================

  if (!gameState.includes("")) {

    gameActive = false;


    setTimeout(() => {

      showResult("draw");

    }, 500);


    return;
  }


  // =========================
  // CHANGE PLAYER
  // =========================

  currentPlayer =
    currentPlayer === "X" ? "O" : "X";


  statusText.textContent =
    `Player ${currentPlayer}'s turn`;

}


/* =========================
   SHOW RESULT SCREEN
========================= */

function showResult(result, player) {

  // Hide game screen

  gameScreen.style.display = "none";


  // Show result screen

  resultScreen.style.display = "block";


  if (result === "win") {

    resultIcon.textContent = "🎉";

    resultTitle.textContent =
      `Player ${player} Wins!`;

    resultMessage.textContent =
      "Congratulations! You won the game.";

  }


  if (result === "draw") {

    resultIcon.textContent = "🤝";

    resultTitle.textContent =
      "It's a Draw!";

    resultMessage.textContent =
      "Nobody won this round.";

  }

}


/* =========================
   NEW GAME
========================= */

function newGame() {

  // Reset player

  currentPlayer = "X";

  // Activate game

  gameActive = true;


  // Clear board

  gameState = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ];


  // Clear cells

  cells.forEach(cell => {

    cell.textContent = "";

    cell.classList.remove(
      "x",
      "o",
      "winner"
    );

  });


  // Update status

  statusText.textContent =
    "Player X's turn";


  // Hide result screen

  resultScreen.style.display = "none";


  // Show game screen

  gameScreen.style.display = "block";

}


/* =========================
   RESTART BUTTON
========================= */

restartBtn.addEventListener(
  "click",
  newGame
);


/* =========================
   NEW GAME BUTTON
========================= */

newGameBtn.addEventListener(
  "click",
  newGame
);


/* =========================
   CELL EVENTS
========================= */

cells.forEach(cell => {

  cell.addEventListener(
    "click",
    handleCellClick
  );

});
