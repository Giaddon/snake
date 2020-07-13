const DIMENSIONS = {x: 10, y: 10};
let gameboard = [];
let snake = {
  length: 2,
  x: 3,
  y: 3,
}

window.onload = start;

function createBoard() {
  for (let y = 0; y < DIMENSIONS.y; y += 1) {
    let row = [];
    for (let x = 0; x < DIMENSIONS.x; x += 1) {
      row.push(`${y}-${x}`);
    }
    gameboard.push(row);
  }

  console.log(gameboard);
}

function drawBoard() {
  const visualBoard = document.querySelector("#gameboard");
  for (y = 0; y < DIMENSIONS.y; y += 1) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let x = 0; x < DIMENSIONS.x; x += 1) {
      let cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      cell.setAttribute("id", `${y}-${x}`)
      row.appendChild(cell);
    }
    visualBoard.appendChild(row); 
  }
}

function cycle() {
  function drawSnake() {
    const targetCell = document.getElementById(`${snake.y}-${snake.x}`);
    targetCell.style.setProperty("background-color", "tomato"); 
  }

  drawSnake();
}

function highlightCell(y,x) {
  const targetCell = document.getElementById(`${y}-${x}`);
  targetCell.style.setProperty("background-color", "tomato");
}

function start() {
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName === 'ArrowDown') snake.y += 1;
    if (keyName === 'ArrowUp') snake.y -= 1;
    if (keyName === 'ArrowLeft') snake.x -= 1;
    if (keyName === 'ArrowRight') snake.x += 1;

    cycle();
  });
  createBoard();
  drawBoard();
  cycle();
}



  
