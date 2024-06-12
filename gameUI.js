const cells = document.querySelectorAll('.cell');
let message = document.querySelector('.message');
let turnMessage = document.querySelector('.turn');
const game = createGame();

function handleClick(e){
    const r = Number(e.target.parentNode.dataset.row);
    const c = Number(e.target.dataset.col);
    
    if(!game.makeMove(r, c)){
        message.textContent = "Place already occupied!!";
        return;
    }
    const playerSign = document.createElement('p');
    playerSign.textContent = emojify(game.getCurrentPlayer());
    e.target.append(playerSign);

    if(game.isTie()){
        message.textContent = "Tie!";
        cleanUp();
        return;
    }

    if(game.won()){
        message.textContent = `${emojify(game.getCurrentPlayer())} wins!`;
        cleanUp();
        return;
    }
    game.switchPlayer();
    turnMessage.textContent = `Player ${emojify(game.getCurrentPlayer())}'s turn`;
}

function emojify(sign){
    return sign === "X" ? "✖️" : "⭕";
}

function initGame(){
    game.reset();
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.addEventListener('click',handleClick)
    });
    message.textContent = "";
    turnMessage.textContent = `Player ${emojify('X')}'s turn`;
    console.log('Game initialised');
}

function cleanUp() {
    cells.forEach((cell) => {
        cell.removeEventListener('click',handleClick);
    });
}


document.querySelector('#reset').addEventListener('click', e => initGame());

initGame();