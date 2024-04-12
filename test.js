
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const canvasWidth = 302;

const canvasHeight = 152;

const cellSize = 10;


let snakeX = [10];

let snakeY = [10];

let speedX = 0;

let speedY = 0;

let foodX = Math.floor(Math.random() * numCellsWidth);

let foodY = Math.floor(Math.random() * numCellsHeight);

let foodCounter = 0;
let maxFoodCounter = 0;


function drawSnake() {
  
}


function checkCollision() {
  
 
}


function drawGame() {
  
}


document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 37: // flèche gauche
      if (speedX !== 1) {
        speedX = -1;
        speedY = 0;
      }
      break;
    case 38: // flèche haut
      
      if (speedY !== 1) {
        speedX = 0;
        speedY = -1;
      }
      break;
    case 39: // flèche droite
      // Change la direction vers la droite, à condition que le serpent ne soit pas déjà dirigé vers la gauche
      if (speedX !== -1) {
        speedX = 1;
        speedY = 0;
      }
      break;
    case 40: // flèche bas
      // Change la direction vers le bas, à condition que le serpent ne soit pas déjà dirigé vers le haut
      if (speedY !== -1) {
        speedX = 0;
        speedY = 1;
      }
      break;
  }
});

