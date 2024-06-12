const cells = document.querySelectorAll('.cell');
let message = document.querySelector('.message');
let turnMessage = document.querySelector('.turn');
const game = createGame();

function initGame(){
    cells.forEach((cell) => {
        cell.addEventListener('click',(e)=> {
            const r = Number(e.target.parentNode.dataset.row);
            const c = Number(e.target.dataset.col);
            
            if(!game.makeMove(r, c)){
                message.textContent = "Place already occupied!!";
                return;
            }
            if(game.isTie()){
                message.textContent = "Tie!!";
            }

            const playerSign = document.createElement('p');
            playerSign.textContent = game.getCurrentPlayer();
            e.target.append(playerSign);

            if(game.won()){
                message.textContent = `${game.getCurrentPlayer()} wins`;
            }
            game.switchPlayer();
            turnMessage.textContent = `Player ${game.getCurrentPlayer()}'s turn`;
        });
    });
}
initGame();