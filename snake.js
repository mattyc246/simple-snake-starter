// Set the canvas border and background color
const CANVAS_BORDER_COLOR = "black";
const CANVAS_BACKGROUND_COLOR = "#F0F3BD";
const SNAKE_COLOR = "limegreen";
const SNAKE_BORDER_COLOR = "darkgreen";

// Creates the coordinates for the starting snake
let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 }
];

let score = 0;
let highScore = 0;
let speed = 150;
let points = 5;
let counter = 0;

let changingDirection = false;

// Horizontal Velocity
let dx = 15;

// Vertical velocity
let dy = 0;

let foodX = 0;

let foodY = 0;

// Select the canvas that we will be working with
const gameCanvas = document.getElementById("gameCanvas");
const newGameButton = document.querySelector(".newGame");
const scoreBoard = document.getElementById("score");
const highScoreBoard = document.getElementById("highScore");
const playNew = document.querySelector(".playAgain");

// Return a 2 dimensions drawing context
const ctx = gameCanvas.getContext("2d");

// Function to set up the canvas
function clearCanvas() {
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  ctx.strokeStyle = CANVAS_BORDER_COLOR;

  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// Function to move the snake
function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  snake.unshift(head);

  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    counter++;
    if (counter == 10) {
      counter = 0;
      points += 5;
      speed -= 10;
    }
    score += points;
    scoreBoard.innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
}

// Function to draw the snake
function drawSnakePart(snakePart) {
  ctx.fillStyle = SNAKE_COLOR;
  ctx.strokeStyle = SNAKE_BORDER_COLOR;

  ctx.fillRect(snakePart.x, snakePart.y, 15, 15);
  ctx.strokeRect(snakePart.x, snakePart.y, 15, 15);
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changingDirection) return;

  changingDirection = true;

  const keyPressed = event.keyCode;
  const goingUp = dy === -15;
  const goingDown = dy === 15;
  const goingRight = dx === 15;
  const goingLeft = dx === -15;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -15;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -15;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 15;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 15;
  }
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 15) * 15;
}

function createFood() {
  foodX = randomTen(0, gameCanvas.width - 15);
  foodY = randomTen(0, gameCanvas.height - 15);

  snake.forEach(function isFoodOnSnake(part) {
    const foodIsOnSnake = part.x == foodX && part.y == foodY;
    if (foodIsOnSnake) {
      createFood();
    }
  });
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "darkred";
  ctx.fillRect(foodX, foodY, 15, 15);
  ctx.strokeRect(foodX, foodY, 15, 15);
}

function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (didCollide) return true;
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameCanvas.width - 15;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 15;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function getHighScore() {
  storedScore = localStorage.getItem("snake-hs");
  if (storedScore) {
    highScore = storedScore;
    highScoreBoard.innerHTML = highScore;
  }
}

function startNewGame() {
  score = 0;
  points = 5;
  speed = 150;
  countr = 0;
  changingDirection = false;
  dx = 15;
  dy = 0;
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 }
  ];
  $("#gameOver").fadeOut(1000);
  $("#newScoreContainer").fadeOut(1000);
  $("#oldScoreContainer").fadeOut(1000);
  $(".playAgain").fadeOut(1000, function() {
    $("#scoreBoard").fadeIn(1000);
    $("#gameCanvas").fadeIn(1000, function() {
      createFood();
      main();
    });
  });
}

function main() {
  if (didGameEnd()) {
    if (!highScore || score > highScore) {
      highScoreBoard.innerHTML = score;
      highScore = score;
      localStorage.setItem("snake-hs", score);
      $("#scoreBoard").fadeOut(1000);
      $("#gameCanvas").fadeOut(1000, function() {
        $("#gameOver").fadeIn(1000);
        $("#newHighscore").html(score);
        $("#newScoreContainer").fadeIn(1000);
        $(".playAgain").fadeIn(1000);
      });
    } else {
      $("#scoreBoard").fadeOut(1000);
      $("#gameCanvas").fadeOut(1000, function() {
        $("#gameOver").fadeIn(1000);
        $("#oldHighscore").html(score);
        $("#oldScoreContainer").fadeIn(1000);
        $(".playAgain").fadeIn(1000);
      });
    }
    return;
  }
  setTimeout(function onTick() {
    changingDirection = false;
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();

    main();
  }, speed);
}

document.addEventListener("keydown", changeDirection);
newGameButton.addEventListener("click", function() {
  $(".title").fadeOut(1000);
  $(".newGame").fadeOut(1000, function() {
    $("#scoreBoard").fadeIn(1000);
    $("#gameCanvas").fadeIn(1000, function() {
      createFood();
      main();
    });
  });
});

playNew.addEventListener("click", startNewGame);

clearCanvas();
getHighScore();
