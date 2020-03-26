### Part 1: Handling Input to Change Direction

```js
// Function to handle changing direction of the snake
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

document.addEventListener("keydown", changeDirection);
```

### Part 2: Create a new piece of food

```js
// Function to create a new piece of food for the snake to eat
function createFood() {
  let validFoodPosition = false

  while(!validFoodPosition){
    foodX = randomTen(0, gameCanvas.width - 15);
    foodY = randomTen(0, gameCanvas.height - 15);

    validFoodPosition = true

    snake.forEach(function(bodyPart) {
      const foodIsOnSnake = bodyPart.x == foodX && bodyPart.y == foodY;
      if (foodIsOnSnake) {
        validFoodPosition = false
      }
    });
  }
}

if (didEatFood) {
    score += points;
    scoreBoard.innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
```

### Part 3: Checking for Game Over

```js
// Function to check if the game has ended
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

if (didGameEnd()) {
    alert("Game Over");
    return;
}
```