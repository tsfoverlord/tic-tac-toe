function createGame() {
    let board = [['','',''],['','',''],['','','']];
    const playerX = 'X';
    const playerO = 'O';
    let currentPlayer = playerX;
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function makeMove(r,c){
        if(r < 0 || r >= 3 || c < 0 || c >= 3){
            console.log('Invalid move');
            return false;
        }
        if(board[r][c] !== ''){
            console.log('Place already occupied');
            return false;
        }
        board[r][c] = currentPlayer;
        return true;
    }

    function won() {
        for(let r = 0; r < 3; r++){
            if(board[r].every(x => x === currentPlayer)){
                return true;
            }
        }
        
        for(let c = 0; c < 3; c++){
            let flag = true;
            for(let r = 0; r < 3; r++){
                if(board[r][c] !== currentPlayer){
                    flag = false;
                }
            }
            if(flag){
                return true;
            }
        }

        if(board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer){
            return true;
        }
        if(board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer){
            return true;
        }

        return false;
    }

    function play() {
        let moves = 9;
        while(moves > 0){
            console.log(`${moves} remaining`);
            console.table(board);
            const r = Number(prompt(`Enter row: Player(${currentPlayer})`));
            const c = Number(prompt(`Enter column: Player(${currentPlayer})`));
            console.log(`Player ${currentPlayer} moves on (${r},${c})`);
            if (!makeMove(r, c)) {
                continue;
            }
            if(won()) {
                console.log(`${currentPlayer} wins`);
                return;
            }
            switchPlayer();
            moves--;
        }
        console.log('Tie');
    }

    return {play};
}

const game = createGame();
game.play();