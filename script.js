// const board = document.querySelector('.board');
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