const DIMENSIONS = {x: 10, y: 10};
let gameboard = [];
let gameover = false;
let fruit = {x: Math.floor(Math.random() * DIMENSIONS.x ), y: Math.floor(Math.random() * DIMENSIONS.y)}
let interval = 600;
let intervalID = null;

class Snake {
  constructor(length=1, head=new Cell(3,3)) {
    this.length = length;
    this.head = head;
    this.tail = head;
    this.maxlength = 3;
    this.body = [];
    this.direction = "down";
  }

  slither(direction) {
    let newTailPos = {x: this.tail.x, y: this.tail.y}
    let lastPos = {x: this.head.x, y: this.head.y}
    // function updateBody() {
      
    //   }

    switch (direction) {
      case "down":
        if (this.head.y + 1 === DIMENSIONS.y) { 
          gameover = true;
          break;
        } 
        this.head.y += 1;
        for (let cell of this.body) {
          let currPos = {x: cell.x, y: cell.y}
          cell.x = lastPos.x;
          cell.y = lastPos.y
          lastPos = currPos;
        }
        break;
    
      case "up":
        if (this.head.y === 0) { 
          gameover = true;
          break;
        } 
        this.head.y -= 1;
        for (let cell of this.body) {
          let currPos = {x: cell.x, y: cell.y}
          cell.x = lastPos.x;
          cell.y = lastPos.y
          lastPos = currPos;
        }
        break;
      

      case "left":
        if (this.head.x === 0) { 
          gameover = true;
          break;
        } 
        this.head.x -= 1;  
        for (let cell of this.body) {
          let currPos = {x: cell.x, y: cell.y}
          cell.x = lastPos.x;
          cell.y = lastPos.y
          lastPos = currPos;
        }
        break;

      case "right":
        if (this.head.x + 1 === DIMENSIONS.x) { 
          gameover = true;
          break;
        } 
        this.head.x += 1;  
        for (let cell of this.body) {
          let currPos = {x: cell.x, y: cell.y}
          cell.x = lastPos.x;
          cell.y = lastPos.y
          lastPos = currPos;
        }
        break;

      default:
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
    let targetCell = document.getElementById(`${snake.head.y}-${snake.head.x}`);
    targetCell.style.setProperty("background-color", "green"); 
    
    for (let cell of snake.body) {
      targetCell = document.getElementById(`${cell.y}-${cell.x}`);
      targetCell.style.setProperty("background-color", "tomato"); 
    }
  }

  function drawFruit() {
    let targetCell = document.getElementById(`${fruit.y}-${fruit.x}`);
    targetCell.style.setProperty("background-color", "gold"); 
  }

  function eatFruit(){
    if (`${snake.head.x}-${snake.head.y}` === `${fruit.x}-${fruit.y}`) {
      snake.maxlength += 1;
      if (interval > 150) { 
        clearInterval(intervalID);
        interval -= 50;
        run();
      }
      addFruit();
    }
  }

  function checkForCollision() {
    const headPos = `${snake.head.x}-${snake.head.y}`;
    for (let cell of snake.body) {
      let bodyPos = `${cell.x}-${cell.y}`;
      if (headPos === bodyPos) gameover = true;
    }
  }

  snake.slither(snake.direction);
  drawSnake();
  eatFruit();
  drawFruit();
  checkForCollision();
  if (gameover) {
    document.getElementById("gameover").style.setProperty("display", "block"); ;
    clearInterval(intervalID);
  }
}

function addFruit(){
  fruit.x = Math.floor(Math.random() * DIMENSIONS.x );
  fruit.y = Math.floor(Math.random() * DIMENSIONS.y );
}


function start() {
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName === 'ArrowDown' && snake.direction !== "up") snake.direction = "down";
    if (keyName === 'ArrowUp' && snake.direction !== "down") snake.direction="up";
    if (keyName === 'ArrowLeft' && snake.direction !== "right") snake.direction="left";
    if (keyName === 'ArrowRight' && snake.direction !== "left") snake.direction="right";
  });
  createBoard();
  drawBoard();
  addFruit();
  run();
}

function run() {
  intervalID = setInterval( () => {cycle()}, interval);
}

window.onload = start;




  
