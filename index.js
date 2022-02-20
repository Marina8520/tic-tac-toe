const button = document.querySelector('.button');
const fieldItem = document.querySelectorAll('.field-item');
const gameStatus = document.querySelector('.status');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
let flag = true;
let win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

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
    }
    togglePlayer(true);
})

for(let i = 0; i < fieldItem.length; i++) {
    fieldItem[i].addEventListener('click', (el) => {
        if (!el.target.classList.contains('done')) {
            el.target.classList.add('done');
            el.target.classList.add(flag ? 'active-x' : 'active-o');
            togglePlayer();
        }
    })
}