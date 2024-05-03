const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let cellSize = 43.75;

const foodImg = new Image();
foodImg.src = '../Images/Pomme.png';

const eatApple = new Audio();
eatApple.src = '../Sound/mangePomme.mp3'

const gameOver = new Audio();
gameOver.src = '../Sound/gameOver.mp3'

let snake = [];
snake[0] = { x: 2 * cellSize, y: 8 * cellSize };

let speedX = 0;
let speedY = 0;

let foodX = Math.floor(Math.random() * 15 + 1) * cellSize;
let foodY = Math.floor(Math.random() * 15 + 1) * cellSize;

let foodCounter = 0;
let maxFoodCounter = 0;

const checkCollision = (head, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      return true;
    }
  }
  return false;
};

let snakeImg = document.getElementById('snakeD'); // Initialisation de snakeImg

const drawGame = () => {
  const bodySnakeImg = document.getElementById('bodySnakeImg');
  ctx.clearRect(0, 0, 700, 700);
  ctx.drawImage(foodImg, foodX, foodY);
  
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.drawImage(snakeImg, snake[i].x, snake[i].y, cellSize, cellSize);
    } else {
      ctx.drawImage(bodySnakeImg, snake[i].x, snake[i].y, cellSize, cellSize);
    }
  }

  let snakeX = snake[0].x + speedX * cellSize; // Utilisation de la vitesse pour déplacer le serpent
  let snakeY = snake[0].y + speedY * cellSize;

  if (snakeX == foodX && snakeY == foodY) {
    foodCounter++;
    eatApple.play();
    if (foodCounter > maxFoodCounter) maxFoodCounter++;
    foodX = Math.floor(Math.random() * 15 + 1) * cellSize;
    foodY = Math.floor(Math.random() * 15 + 1) * cellSize;
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (snakeX < 0 || snakeY < 0 || snakeX >= 16 * cellSize || snakeY >= 16 * cellSize || checkCollision(newHead, snake)) {
    gameOver.play();
    clearInterval(game);
  }
  snake.unshift(newHead);

  document.getElementById("foodCounter").innerHTML = foodCounter;
  document.getElementById("maxFoodCounter").innerHTML = maxFoodCounter;
};

let game = setInterval(drawGame, 100);

document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case 37: // flèche gauche
        if (speedX !== -1) {
            snakeImg = document.getElementById('snakeD');
          speedX = 1;
          speedY = 0;
        }
        break;
      case 38: // flèche haut
        if (speedY !== -1) {
            snakeImg = document.getElementById('snakeB');
          speedX = 0;
          speedY = 1;
        }
        break;
      case 39: // flèche droite
        if (speedX !== 1) {
          
          snakeImg = document.getElementById('snakeG');
          speedX = -1;
          speedY = 0;
        }
        break;
      case 40: // flèche bas
        if (speedY !== 1) {
            snakeImg = document.getElementById('snakeH');
          speedX = 0;
          speedY = -1;
        }
        break;
    }
  });
  

  const replayButton = document.getElementById("replayButton");

  replayButton.addEventListener("click", function () {
      // Réinitialisation du jeu
      clearInterval(game); // Arrête le jeu actuel
      initGame(); // Réinitialise le jeu
  });


function initGame() {
  // Réinitialisation des variables du jeu
  snake = [];
  snake[0] = { x: 2 * cellSize, y: 8 * cellSize };
  speedX = 0;
  speedY = 0;
  foodX = Math.floor(Math.random() * 15 + 1) * cellSize;
  foodY = Math.floor(Math.random() * 15 + 1) * cellSize;
  foodCounter = 0;
  

  // Réinitialisation de l'image du serpent
  snakeImg = document.getElementById('snakeD');

  // Redémarrer le jeu
  game = setInterval(drawGame, 100);
}
