const button = document.querySelector('.button');
const lastWinners = document.querySelector('.last-winners');
const fieldItem = document.querySelectorAll('.field-item');
const gameStatus = document.querySelector('.status');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
let flag = true;
let winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let gameFinished = false;
let winners = localStorage;
console.log(winners);

function togglePlayer(start) {
    player1.classList.toggle('active', typeof start == 'undefined' ? undefined : start);
    player2.classList.toggle('active', typeof start == 'undefined' ? undefined : !start);
    flag = start ? start : !flag;
}

button.addEventListener('click', () => {
    for ( let el of fieldItem) {
        el.classList.remove('active-x'); 
        el.classList.remove('done'); 
        el.classList.remove('active-o');
        el.classList.add('field-item');
        el.classList.remove('none-field'); 
    }
    togglePlayer(true);
    document.querySelector('h3').innerHTML = 'The active player highlighted in red'
    gameFinished = false;
})

lastWinners.addEventListener('click', () => {
    for(let el of fieldItem) {
        el.classList.remove('field-item');
        el.classList.add('none-field');
        document.querySelector('h3').innerHTML = Object.values(localStorage).join(' | ');
    }

})

for(let i = 0; i < fieldItem.length; i++) {
    fieldItem[i].addEventListener('click', (el) => {
        if (!el.target.classList.contains('done') && !gameFinished) {
            el.target.classList.add('done');
            el.target.classList.add(flag ? 'active-x' : 'active-o');
            if (winGame('active-x')) {
                document.querySelector('h3').innerHTML = 'Player 1 WINS!';
                gameFinished = true;
                localStorage.setItem(localStorage.length + 1, 'Player 1');
                
            } else if (winGame('active-o')) {
                document.querySelector('h3').innerHTML = 'Player 2 WINS!';
                gameFinished = true;
                localStorage.setItem(localStorage.length + 1, 'Player 2');
            } else if(isDraw()){
                document.querySelector('h3').innerHTML = 'Game ended in a draw';
                gameFinished = true;
            } else {
                togglePlayer();
            }
        }
    })
}

function winGame (className) {
    let i = 0, n = 0;
    let win = false;
    for( let condition of winCombinations) {
        i = 0;
        for( let el of condition) {
            if(fieldItem[el].classList.contains(className)) {
                i++; 
            };
            if(i === 3) {
                win = true;
            }
        }
        
    } return win;
}

function isDraw() {
    let n = 0;
    let draw = false;
    for( let el of fieldItem) {
        if(el.classList.contains('done')) {
            n++;
        }
        if(n === 9) {
            draw = true; 
        }
    } return draw;
}