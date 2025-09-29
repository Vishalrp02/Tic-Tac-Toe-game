let boardState = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

const board = document.querySelector(".board");
const info = document.querySelector(".info");
const resetbtn = document.querySelector(".reset-btn");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const checkWinner = () => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    //winner
    if (
      gameActive &&
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      info.textContent = `Player ${boardState[a]} wins!`;
      return (gameActive = false);
    }
  }
  //draw
  if (!boardState.includes(null) && gameActive) {
    info.textContent = `Its a draw!...Try Again`;
    return (gameActive = false);
  }
};

board.addEventListener("click", (e) => {
  //e.preventDefault();
  const cell = e.target;

  if (gameActive && cell.textContent !== "") {
    info.textContent = "Choose another Box";
    return;
  }

  if (gameActive && cell.classList.contains("cell")) {
    const index = cell.dataset.index;
    //console.log("clicked", index);
    cell.textContent = currentPlayer;
    boardState[index] = currentPlayer;
    checkWinner();
    if (gameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      info.textContent = `Player ${currentPlayer}’s turn`;
      console.log(currentPlayer);
    }
  }
});

resetbtn.addEventListener("click", (e) => {
  boardState = Array(9).fill(null);
  currentPlayer = "X";
  document.querySelectorAll(".cell").forEach((cur) => {
    cur.textContent = "";
  });
  gameActive = true;
  info.textContent = `Player ${currentPlayer}’s turn`;
});
