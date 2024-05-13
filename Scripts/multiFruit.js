
const canvas = document.querySelector ("canvas");

const ctx = canvas.getContext("2d");

let cellSize = 43.75;

const foodImg =new Image();
foodImg.src = '../Images/Pomme.png'

const eatApple = new Audio();
eatApple.src = '../Sound/mangePomme.mp3'

const gameOver = new Audio();
gameOver.src = '../Sound/gameOver.mp3'

let snakeImg = document.getElementById('snakeD'); // Initialisation de snakeImg


let snake =[];
snake[0]= { x:2*cellSize, y:8*cellSize};

let speedX = 0;
let speedY = 0;


let allFood= ([
    {
        food1: 'food1',
        x:Math.floor(Math.random() * 15 + 1) * cellSize,
        y:Math.floor(Math.random() * 15 + 1) * cellSize,
    },
    {
        food2: 'food2',
        x:Math.floor(Math.random() * 15 + 1) * cellSize,
        y:Math.floor(Math.random() * 15 + 1) * cellSize,
    },
    {
        food3: 'food3',
        x:Math.floor(Math.random() * 15 + 1) * cellSize,
        y:Math.floor(Math.random() * 15 + 1) * cellSize,
    }
    ])

    const foodXCoordinates =allFood.map((x)=> x.x);
    const foodYCoordinates =allFood.map((y)=> y.y);

let foodCounter = 0;
let foodCounter2 = 0
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
  const bodySnakeImg = document.getElementById('bodySnakeImg');
  ctx.clearRect(0,0,700,700);
  drawGridBackground();
foodXCoordinates.forEach((x, index) => {
    const y = foodYCoordinates[index];
    ctx.drawImage(foodImg, x, y);
});




for (let i = 0; i < snake.length; i++) {
  if (i === 0) {
    ctx.drawImage(snakeImg, snake[i].x, snake[i].y, cellSize, cellSize);
  } else {
    ctx.drawImage(bodySnakeImg, snake[i].x, snake[i].y, cellSize, cellSize); 
    console.log('la')
  }
}
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if(speedX==-1) snakeX-=cellSize;
      if(speedY==-1) snakeY-=cellSize;
      if(speedX==1) snakeX+=cellSize;
      if(speedY==1) snakeY+=cellSize;


      foodXCoordinates.forEach((x, index) => {
        const y = foodYCoordinates[index];
      if(snakeX == x && snakeY == y){
        foodCounter++;
        foodCounter2++
        eatApple.play();
        if(foodCounter>maxFoodCounter)maxFoodCounter++;
            foodXCoordinates[index] =Math.floor(Math.random() * 15 + 1) * cellSize;
            foodYCoordinates[index] =Math.floor(Math.random() * 15 + 1) * cellSize;
      } else {
          snake.pop();
      }
    });

    let newHead ={
      x:snakeX,
      y:snakeY,
    }

    if(snakeX<0||snakeY<0||snakeX>15*cellSize||snakeY>15*cellSize||checkCollision(newHead, snake)){
      gameOverHandler();
    clearInterval(game);;
    }
    snake.unshift(newHead); 
    document.getElementById("foodCounter").innerHTML = foodCounter;
    document.getElementById("maxFoodCounter").innerHTML = maxFoodCounter;
    document.getElementById("foodCounter2").innerHTML = foodCounter2;
}

function gameOverHandler() {
  gameOver.play();
  clearInterval(game);
  document.getElementById("popup").style.display = "block";
}

document.getElementById("replayButtonPopup").addEventListener("click", function () {
  document.getElementById("popup").style.display = "none";
  initGame();
});

let game=setInterval(drawGame, 150);


document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 37: // flèche gauche
      if (speedX !== 1) {
        snakeImg = document.getElementById('snakeG');
        speedX = -1;
        speedY = 0;
      }
      break;
    case 38: // flèche haut
      if (speedY !== 1) {
        snakeImg = document.getElementById('snakeH');
        speedX = 0;
        speedY = -1;
      }
      break;
    case 39: // flèche droite
      if (speedX !== -1) {
        snakeImg = document.getElementById('snakeD');
        speedX = 1;
        speedY = 0;
      }
      break;
    case 40: // flèche bas
      if (speedY !== -1) {
        snakeImg = document.getElementById('snakeB');
        speedX = 0;
        speedY = 1;
      }
      break;
  }

  
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
  foodCounter2 = 0

  // Réinitialisation de l'image du serpent
  snakeImg = document.getElementById('snakeD');

  // Redémarrer le jeu
  game = setInterval(drawGame, 150);
}

function drawGridBackground() {
  const numCols = Math.ceil(canvas.width / cellSize);
  const numRows = Math.ceil(canvas.height / cellSize);

  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      const x = col * cellSize;
      const y = row * cellSize;
      const isEven = (col + row) % 2 === 0;
      ctx.fillStyle = isEven ? 'pink' : 'orange';
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
}
