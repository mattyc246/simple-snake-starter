/*
################################################################
################################################################
##                          VARIABLES                         ##
################################################################
################################################################
*/

// Set the canvas border and background color
const CANVAS_BORDER_COLOR = "black";
const CANVAS_BACKGROUND_COLOR = "#FFFFFF";

// Set the color for the snake body parts
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

let score = 0; // Score will keep track of the number of pieces of food eaten
let speed = 150; // Speed will be used to determine how slow or fast the snake moves in milliseconds
let points = 5; // This will be the value of each piece of food

// Initialize changingDirection to false by default
let changingDirection = false;

// Horizontal Velocity
let dx = 15;

// Vertical velocity
let dy = 0;

// Initialize food x axis position
let foodX = 0;

// Initialize food y axis position
let foodY = 0;

// Select the canvas that we will be working with
const gameCanvas = document.getElementById("gameCanvas");

// Select the scoreboard so we can update it each time food is eaten
const scoreBoard = document.getElementById("score");

// Return a 2 dimensions drawing context
const ctx = gameCanvas.getContext("2d");

/*
################################################################
################################################################
##                   CANVAS FUNCTIONS                         ##
################################################################
################################################################
*/

// Function to set up the canvas
function clearCanvas() {
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  ctx.strokeStyle = CANVAS_BORDER_COLOR;

  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// Function to draw the snake
function drawSnake() {
  snake.forEach(function(snakePart) {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.strokeStyle = SNAKE_BORDER_COLOR;

    ctx.fillRect(snakePart.x, snakePart.y, 15, 15);
    ctx.strokeRect(snakePart.x, snakePart.y, 15, 15);
  });
}

// Function to draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "darkred";
  ctx.fillRect(foodX, foodY, 15, 15);
  ctx.strokeRect(foodX, foodY, 15, 15);
}

/*
################################################################
################################################################
##                         GAME LOGIC                         ##
################################################################
################################################################
*/

// Function to move the snake
function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  snake.unshift(head);

  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;

  if (didEatFood) {
    score += points;
    scoreBoard.innerHTML = score;
  } else {
    snake.pop();
  }
}

// Function to create random x & y axis position for generating snake
function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 15) * 15;
}

// Function to start the game and play
function play() {

  setTimeout(function() {
    changingDirection = false;
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();

    play();
  }, speed);
}

/*
################################################################
################################################################
##                        DRIVER CODE                         ##
################################################################
################################################################
*/

alert("Click OK to start playing!");
drawFood();
play();
clearCanvas();
