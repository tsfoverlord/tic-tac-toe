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
    playerSign.textContent = game.getCurrentPlayer();
    e.target.append(playerSign);

    if(game.isTie()){
        message.textContent = "Tie!!";
        cleanUp();
        return;
    }

    if(game.won()){
        message.textContent = `${game.getCurrentPlayer()} wins`;
        cleanUp();
        return;
    }
    game.switchPlayer();
    turnMessage.textContent = `Player ${game.getCurrentPlayer()}'s turn`;
}

function initGame(){
    console.log('Game initialised');
    game.reset();
    cells.forEach(cell => {
        cell.innerHTML = "";
    });
    cells.forEach((cell) => {
        cell.addEventListener('click',handleClick)
    });
}

function cleanUp() {
    cells.forEach((cell) => {
        cell.removeEventListener('click',handleClick);
    });
}


document.querySelector('#reset').addEventListener('click', e => initGame());

initGame();