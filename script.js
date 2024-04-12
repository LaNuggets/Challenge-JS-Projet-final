const board = document.querySelector('.board');
for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
        const square = document.createElement('div');
        square.classList.add('square');
        const isEvenRow = row % 2 === 0;
        const isEvenCol = col % 2 === 0;
        if ((isEvenRow && !isEvenCol) || (!isEvenRow && isEvenCol)) {
            square.classList.add('light-square');
        } else {
            square.classList.add('dark-square');
        }
        board.appendChild(square);
    }
}

function roundRect(x, y, w, h, radius)
{
  var canvas = document.getElementById("canvas6");
  var context = canvas.getContext("2d");
  var r = x + w;
  var b = y + h;
  context.beginPath();
  context.strokeStyle="purple";
  context.lineWidth="4";
  context.moveTo(x+radius, y);
  context.lineTo(r-radius, y);
  context.quadraticCurveTo(r, y, r, y+radius);
  context.lineTo(r, y+h-radius);
  context.quadraticCurveTo(r, b, r-radius, b);
  context.lineTo(x+radius, b);
  context.quadraticCurveTo(x, b, x, b-radius);
  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x, y, x+radius, y);
  context.stroke();
  context.fillStyle = "purple";
  context.fill();
}