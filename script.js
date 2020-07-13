const DIMENSIONS = {x: 10, y: 10};
let gameboard = [];

class Snake {
  constructor(length=1, head=new Cell(3,3)) {
    this.length = length;
    this.head = head;
    this.tail = head;
    this.maxlength = 2;
    this.body=[this.head];
  }

  slither(direction) {
    let newTailPos = {x: this.tail.x, y: this.tail.y}

    switch (direction) {
      case "down":
        for (let cell of this.body) {
          cell.y += 1;
        }
        break;
    
      case "up":
        for (let cell of this.body) {
          cell.y -= 1;
        }
        break;
      

      case "left":
        for (let cell of this.body) {
          cell.x -= 1;
        }
        break;

      case "right":
        for (let cell of this.body) {
          cell.x += 1;
        }
        break;
    }
    if (this.length < this.maxlength) {
      let newTail = new Cell(newTailPos.x, newTailPos.y);
      this.body.push(newTail);
      this.tail = newTail;
      this.length += 1;
    }
  
  }

}

class Cell {
  constructor(x=0,y=0) {
    this.x = x;
    this.y = y;
  }
}

let snake = new Snake();



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
    const visualBoard = document.querySelector("#gameboard");
    const boardCells = visualBoard.getElementsByClassName("cell");
    for (let cell of boardCells) {
      cell.style.setProperty("background-color", "bisque");
    }

    for (let cell of snake.body) {
      const targetCell = document.getElementById(`${cell.y}-${cell.x}`);
      targetCell.style.setProperty("background-color", "tomato"); 
    }
  }

  drawSnake();
}

function start() {
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName === 'ArrowDown') snake.slither("down");
    if (keyName === 'ArrowUp') snake.slither("up");
    if (keyName === 'ArrowLeft') snake.slither("left");
    if (keyName === 'ArrowRight') snake.slither("right");

    cycle();
  });
  createBoard();
  drawBoard();
  cycle();
}



window.onload = start;


  
