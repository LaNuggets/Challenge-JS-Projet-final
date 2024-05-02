
const canvas = document.querySelector ("canvas");

const ctx = canvas.getContext("2d");

let cellSize = 43.75;

const foodImg =new Image();
foodImg.src = './Images/Pomme.png'

const backgroundImage = new Image();
backgroundImage.src = './Images/background.jpg'

const eatApple = new Audio();
eatApple.src = './Sound/mangePomme.mp3'

const gameOver = new Audio();
gameOver.src = './Sound/gameOver.mp3'


let snake =[];
snake[0]= { x:2*cellSize, y:8*cellSize};

let mirroredSnake = [];
mirroredSnake[0]= { x:14*cellSize, y:8*cellSize};


let speedX = 0;
let speedY = 0;
let mirroredSpeedX = 0;
let mirroredSpeedY =0;

let foodX = Math.floor(Math.random() * 15 + 1) * cellSize;
let foodY = Math.floor(Math.random() * 15 + 1) * cellSize;

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


const drawGame=()=> {
  ctx.clearRect(0,0,700,700);

  // ctx.drawImage(backgroundImage,0,0);

  ctx.drawImage(foodImg,foodX, foodY);

  for(let i=0;i<snake.length;i++){
    ctx.fillStyle = (i==0) ? "purple" : "red";
    ctx.fillRect(snake[i].x,snake[i].y, cellSize, cellSize);
    ctx.strokeStyle = "black";
    ctx.fillRect(snake[i].x,snake[i].y, cellSize, cellSize);
  }
  
  for(let i=0;i<mirroredSnake.length;i++){
    ctx.fillStyle = (i==0) ? "red" : "purple";
    ctx.fillRect(mirroredSnake[i].x,mirroredSnake[i].y, cellSize, cellSize);
    ctx.strokeStyle = "black";
    ctx.fillRect(mirroredSnake[i].x,mirroredSnake[i].y, cellSize, cellSize);
  }

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;
      let mirroredSnakeX = mirroredSnake[0].x;
      let mirroredSnakeY = mirroredSnake[0].y;

      if(speedX==-1) snakeX-=cellSize;
      if(speedY==-1) snakeY-=cellSize;
      if(speedX==1) snakeX+=cellSize;
      if(speedY==1) snakeY+=cellSize;

      if(mirroredSpeedX==-1) mirroredSnakeX+=cellSize;
      if(mirroredSpeedY==-1) mirroredSnakeY+=cellSize;
      if(mirroredSpeedX==1) mirroredSnakeX-=cellSize;
      if(mirroredSpeedY==1) mirroredSnakeY-=cellSize;

      if(snakeX == foodX && snakeY == foodY || mirroredSnakeX == foodX && mirroredSnakeY == foodY ){
        foodCounter++;
        eatApple.play();
        if(foodCounter>maxFoodCounter)maxFoodCounter++;
        foodX = Math.floor(Math.random() * 15 + 1) * cellSize;
        foodY = Math.floor(Math.random() * 15 + 1) * cellSize;
      } else{
        snake.pop();
      }

    let newHead ={
      x:snakeX,
      y:snakeY,
    }
    let newMirroredHead ={
        x:mirroredSnakeX,
        y:mirroredSnakeY,
      }

    if(snakeX<0||snakeY<0||snakeX>15*cellSize||snakeY>15*cellSize||checkCollision(newHead, snake)){
      gameOver.play();
      clearInterval(game);
    }
    snake.unshift(newHead);
    // mirroredSnake.unshift(newMirroredHead);

    ctx.fillStyle = 'orange';
    ctx.font="30px Arial";
    ctx.fillText(foodCounter, 15*cellSize, 1*cellSize);
}

let game=setInterval(drawGame, 100);


document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 37: // flèche gauche
      if (speedX !== 1) {
        speedX = -1;
        speedY = 0;
        mirroredSpeedX = 1;
        mirroredSpeedY = 0;
      }
      break;
    case 38: // flèche haut
      
      if (speedY !== 1) {
        speedX = 0;
        speedY = -1;
        mirroredSpeedX = 0;
        mirroredSpeedY = -1;
      }
      break;
    case 39: // flèche droite
      // Change la direction vers la droite, à condition que le serpent ne soit pas déjà dirigé vers la gauche
      if (speedX !== -1) {
        speedX = 1;
        speedY = 0;
        mirroredSpeedX = -1;
        mirroredSpeedY = 0;
      }
      break;
    case 40: // flèche bas
      // Change la direction vers le bas, à condition que le serpent ne soit pas déjà dirigé vers le haut
      if (speedY !== -1) {
        speedX = 0;
        speedY = 1;
        mirroredSpeedX = 0;
        mirroredSpeedY = -1;
      }
      break;
  }
});