
const canvas = document.querySelector ("canvas");

const ctx = canvas.getContext("2d");

let cellSize = 43.75;

const foodImg =new Image();
foodImg.src = '../Images/Pomme.png'

const backgroundImage = new Image();
backgroundImage.src = '../Images/background.jpg'

const eatApple = new Audio();
eatApple.src = '../Sound/mangePomme.mp3'

const gameOver = new Audio();
gameOver.src = '../Sound/gameOver.mp3'

let snakeImg = document.getElementById('snakeD'); // Initialisation de snakeImg
let mirroredSnakeImg = document.getElementById('snakeG2'); // Initialisation de snakeImg


let snake =[];
snake[0]= { x:2*cellSize, y:8*cellSize};

let mirroredSnake = [];
mirroredSnake[0]= { x:14*cellSize, y:8*cellSize};


let speedX = 0;
let speedY = 0;
let mirroredSpeedX = 0;
let mirroredSpeedY =0;

let foodX = Math.floor(Math.random() * 16 + 1) * cellSize;
let foodY = Math.floor(Math.random() * 16 + 1) * cellSize;

let foodCounter = 0;
let maxFoodCounter = 0;

const checkCollision= (head, arr)=>{
  for(let i=0;i<arr.length;i++){
    if(head.x == arr[i].x && head.y == arr[i].y){
      return true
    }
  }
  return false;
}

const headCollision=(head)=>{
    if(head.x == 8*cellSize && head.y == 8*cellSize){
      return true;
    }
    return false;
}

const drawGame=()=> {
  const bodySnakeImg = document.getElementById('bodySnakeImg');
  const mirroredBodySnakeImg = document.getElementById('bodySnakeImg2');


  ctx.clearRect(0,0,743.75,743.75);
  ctx.drawImage(foodImg,foodX, foodY);

  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.drawImage(snakeImg, snake[i].x, snake[i].y, cellSize, cellSize);
    } else {
      ctx.drawImage(bodySnakeImg, snake[i].x, snake[i].y, cellSize, cellSize);
    }
  }
  
  
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.drawImage(mirroredSnakeImg, mirroredSnake[i].x,mirroredSnake[i].y, cellSize, cellSize);
    } else {
      ctx.drawImage(mirroredBodySnakeImg, mirroredSnake[i].x,mirroredSnake[i].y, cellSize, cellSize);
    }
  }

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;
      let mirroredSnakeX = mirroredSnake[0].x;
      let mirroredSnakeY = mirroredSnake[0].y;

      if(speedX==-1) snakeX-=cellSize;
      if(speedY==-1) snakeY-=cellSize;
      if(speedX==1) snakeX+=cellSize;
      if(speedY==1) snakeY+=cellSize;

      if(mirroredSpeedX==-1) mirroredSnakeX-=cellSize;
      if(mirroredSpeedY==-1) mirroredSnakeY-=cellSize;
      if(mirroredSpeedX==1) mirroredSnakeX+=cellSize;
      if(mirroredSpeedY==1) mirroredSnakeY+=cellSize;

      if(snakeX == foodX && snakeY == foodY || mirroredSnakeX == foodX && mirroredSnakeY == foodY ){
        foodCounter++;
        eatApple.play();
        if(foodCounter>maxFoodCounter)maxFoodCounter++;
        foodX = Math.floor(Math.random() * 16 + 1) * cellSize;
        foodY = Math.floor(Math.random() * 16 + 1) * cellSize;
      } else{
        snake.pop();
        mirroredSnake.pop();
      }

    let newHead ={
      x:snakeX,
      y:snakeY,
    }
    let newMirroredHead ={
        x:mirroredSnakeX,
        y:mirroredSnakeY,
      }

    if(snakeX<0||snakeY<0||snakeX>16*cellSize||snakeY>16*cellSize||checkCollision(newHead, snake)||checkCollision(newHead, mirroredSnake)|| checkCollision(newMirroredHead, snake)||headCollision(newHead)){
      gameOver.play();
      clearInterval(game);
    }
    snake.unshift(newHead);
    mirroredSnake.unshift(newMirroredHead);

    document.getElementById("foodCounter").innerHTML = foodCounter;
    document.getElementById("maxFoodCounter").innerHTML = maxFoodCounter;
}

let game=setInterval(drawGame, 100);

document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 37: // flèche gauche
      if (speedX !== 1) {
        snakeImg = document.getElementById('snakeG');
        mirroredSnakeImg = document.getElementById('snakeD2'); // Initialisation de snakeImg
        speedX = -1;
        speedY = 0;
        mirroredSpeedX = 1;
        mirroredSpeedY = 0;
      }
      break;
    case 38: // flèche haut
      
      if (speedY !== 1) {
        snakeImg = document.getElementById('snakeH');
        mirroredSnakeImg = document.getElementById('snakeB2'); // Initialisation de snakeImg
        speedX = 0;
        speedY = -1;
        mirroredSpeedX = 0;
        mirroredSpeedY = 1;
      }
      break;
    case 39: // flèche droite
      // Change la direction vers la droite, à condition que le serpent ne soit pas déjà dirigé vers la gauche
      if (speedX !== -1) {
        snakeImg = document.getElementById('snakeD');
        mirroredSnakeImg = document.getElementById('snakeG2'); // Initialisation de snakeImg
        speedX = 1;
        speedY = 0;
        mirroredSpeedX = -1;
        mirroredSpeedY = 0;
      }
      break;
    case 40: // flèche bas
      // Change la direction vers le bas, à condition que le serpent ne soit pas déjà dirigé vers le haut
      if (speedY !== -1) {
        snakeImg = document.getElementById('snakeB');
        mirroredSnakeImg = document.getElementById('snakeH2'); // Initialisation de snakeImg
        speedX = 0;
        speedY = 1;
        mirroredSpeedX = 0;
        mirroredSpeedY = -1;
      }
      break;
  }
  const replayButton = document.getElementById("replayButton");

  replayButton.addEventListener("click", function () {
      // Réinitialisation du jeu
      clearInterval(game); // Arrête le jeu actuel
      initGame(); // Réinitialise le jeu
  });
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
  mirroredSnake = [];
  mirroredSnake[0] = { x: 14 * cellSize, y: 8 * cellSize};
  mirroredSpeedX = 0;
  mirroredSpeedY = 0;
  // Réinitialisation de l'image du serpent
  snakeImg = document.getElementById('snakeD');
  mirroredSnakeImg = document.getElementById('snakeG2'); // Initialisation de snakeImg


  // Redémarrer le jeu
  game = setInterval(drawGame, 100);
}