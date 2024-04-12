
const canvas = document.querySelector ("canvas");

const ctx = canvas.getContext("2d");

let cellSize = 43.75;

const foodImg =new Image();
foodImg.src = './Images/Pomme.png'


let snake =[];
snake[0]= { x:2*cellSize, y:8*cellSize};

let speedX = 0;
let speedY = 0;
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

  ctx.drawImage(foodImg,foodX, foodY);

  for(let i=0;i<snake.length;i++){
    ctx.fillStyle = (i==0) ? "purple" : "red";
    ctx.fillRect(snake[i].x,snake[i].y, cellSize, cellSize);
    ctx.strokeStyle = "black";
    ctx.fillRect(snake[i].x,snake[i].y, cellSize, cellSize);
  }

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if(speedX==-1) snakeX-=cellSize;
      if(speedY==-1) snakeY-=cellSize;
      if(speedX==1) snakeX+=cellSize;
      if(speedY==1) snakeY+=cellSize;

      if(snakeX == foodX && snakeY == foodY){
        foodCounter++;
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

    if(snakeX<0||snakeY<0||snakeX>15*cellSize||snakeY>15*cellSize||checkCollision(newHead, snake)){
      clearInterval(game);
    }
    snake.unshift(newHead);
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

// const board = document.querySelector('canvas');
// for (let row = 0; row < 16; row++) {
//     for (let col = 0; col < 16; col++) {
//         const square = document.createElement('div');
//         square.classList.add('square');
//         const isEvenRow = row % 2 === 0;
//         const isEvenCol = col % 2 === 0;
//         if ((isEvenRow && !isEvenCol) || (!isEvenRow && isEvenCol)) {
//             square.classList.add('light-square');
//         } else {
//             square.classList.add('dark-square');
//         }
//         board.appendChild(square);
//     }
// }