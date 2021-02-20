// adding this check, so that the script tag can stay at the start of HTML
document.addEventListener("DOMContentLoaded", function () {
    // create gameboard object, store the gameboard array inside of it (3x3)
    const gameboard = {
        array: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]
    };

    // factory for player objects 
    // receives boolean (isHuman? true or false), returns player properties and methods
    function createPlayer (isHuman) {
        let type = true;
        // x goes first, so human goes first to have a chance at a tie
        let sign = 'X'; 

        if (!isHuman) {
            type = false;
            sign = 'O'; 
        }

        return {sign, type};
    };

    // an iife module to keep track of the gameplay/gameflow as well
    const gameflow = (function () {
        // create two players
        const player1 = createPlayer(true);
        const player2 = createPlayer(false);

        function evaluateState() {
            // public method that evaluates state of the board (for minimax)
            // utility function gives the state a value (1 for x winning, -1 o is winning or draw)
        };

        function checkGameOver (gameArray) {
            // create winningSummary object with gameOver and winningIds properties
            let winningSummary = {
            gameOver: false,
            winningIds: [],
            winner: ''
            }

            // make a copy of gameArray where all X are 1s and all Os are zeros, empties are 5000, while counting empties
            let digitsArray = gameArray.map(inner => inner.slice())

            let emptiesCounter = 0;

            for (let row = 0; row < digitsArray.length; row++) {
                for (let col = 0; col < digitsArray[row].length; col++) {
                    if (gameArray[row][col] === '') {
                        emptiesCounter++;
                        digitsArray[row][col] = 5000;
                    }
                    else if (gameArray[row][col] === 'X') {
                        digitsArray[row][col] = 1;
                    }
                    else if (gameArray[row][col] === 'O') {
                        digitsArray[row][col] = 0;
                    }
                    else {
                        console.log("unexpected symbol in the array")
                    }
                }
            }
            if (!emptiesCounter) {
                // if the gameboard is full, game is over
                winningSummary.gameOver = true;
            }
            // sums rows
            const rowSum = digitsArray.map(r => r.reduce((a, b) => a + b));
            // loops through the new array, and finds any winning row
            for (let i = 0; i < rowSum.length; i++) {
                if (!rowSum[i]) {
                    winningSummary.winner = 'O';
                    winningSummary.gameOver = true;
                    // the index of rowSum is the corresponding row in the gameBoard
                    // meaning the ids will be 'i' and all numbers from 0 to array.length
                    for (let j = 0; j < digitsArray.length; j++) {
                        let winnerId = `${i}${j}`;
                        winningSummary.winningIds.push(winnerId);
                    }
                }
                else if (rowSum[i] === digitsArray.length) {
                    winningSummary.winner = 'X';
                    winningSummary.gameOver = true;
                    // the index of rowSum is the corresponding row in the gameBoard
                    // meaning the ids will be 'i' and all numbers from 0 to array.length
                    for (let j = 0; j < digitsArray.length; j++) {
                        let winnerId = `${i}${j}`;
                        winningSummary.winningIds.push(winnerId);
                    }
                }
            }

            // sums of columns
            const colSum = digitsArray.reduce((a, b) => a.map((x, i) => x + b[i]));
            for (let i = 0; i < colSum.length; i++) {
                if (!colSum[i]) {
                    winningSummary.winner = 'O';
                    winningSummary.gameOver = true;
                    // same as with rows but row and column will be switched, since i is now the column index
                    for (let j = 0; j < digitsArray.length; j++) {
                        let winnerId = `${j}${i}`;
                        winningSummary.winningIds.push(winnerId);
                    }
                    break;
                }
                else if (colSum[i] === digitsArray.length) {
                    winningSummary.winner = 'X';
                    winningSummary.gameOver = true;
                    // the index of rowSum is the corresponding row in the gameBoard
                    // meaning the ids will be 'i' and all numbers from 0 to array.length
                    for (let j = 0; j < digitsArray.length; j++) {
                        let winnerId = `${j}${i}`;
                        winningSummary.winningIds.push(winnerId);
                    }
                    break;
                }
            }

            //sum of diagonals
            const sumDiagonals = {main: 0, second: 0};
            for (let i = 0; i < digitsArray.length; i++) {
                sumDiagonals.main += digitsArray[i][i];
                sumDiagonals.second += digitsArray[i][digitsArray.length-i-1];
            }
            // winning main diagonal
            if (!sumDiagonals.main) {
                // all zeroes, O wins
                winningSummary.winner = 'O';
                winningSummary.gameOver = true;
                // create a list of ids
                for (let i = 0; i < digitsArray.length; i++) {
                    let winnerId = `${i}${i}`;
                    winningSummary.winningIds.push(winnerId);
                }
            }
            else if (sumDiagonals.main === digitsArray.length) {
                // all ones, X wins
                winningSummary.winner = 'X';
                winningSummary.gameOver = true;
                // create a list of ids
                for (let i = 0; i < digitsArray.length; i++) {
                    let winnerId = `${i}${i}`;
                    winningSummary.winningIds.push(winnerId);
                }
            }
            // winning second diagonal
            if (!sumDiagonals.second) {
                // all zeroes, O wins
                winningSummary.winner = 'O';
                winningSummary.gameOver = true;
                // create a list of ids
                for (let i = 0; i < digitsArray.length; i++) {
                    let winnerId = `${i}${digitsArray.length - i - 1}`;
                    winningSummary.winningIds.push(winnerId);
                }
            }
            else if (sumDiagonals.second === digitsArray.length) {
                // all ones, X wins
                winningSummary.winner = 'X';
                winningSummary.gameOver = true;
                // create a list of ids
                for (let i = 0; i < digitsArray.length; i++) {
                    let winnerId = `${i}${digitsArray.length - i - 1}`;
                    winningSummary.winningIds.push(winnerId);
                }
            }
            return winningSummary;
        }


        function sayWhoseTurn (gameArray) {
            // Input: current state, output: whose turn it is (1 for human, 0 for ai)
            let xCounter = 0;
            let oCounter = 0;
            // loop over the 2d array and count how many Os, Xs and empties
            for (let row of gameArray) {
                for (let column of row) {
                    switch (column) {
                        case 'X':
                           xCounter++; 
                            break;
                        case 'O':
                           oCounter++; 
                            break;
                        default:
                            break;
                    }
                }
            }
            
            if (xCounter === 0 && oCounter === 0) {
                return 1;
            }
            else if ( xCounter > oCounter) {
                return 0;
            }
            else {
                return 1;
            }
        };

        function listAllActions (gameArray) {
            // returns an array of empty cell ids 
            let actionsArray = [];
            for (let row = 0; row < gameArray.length; row++) {
                // since arrays in js are objects and not memory cells in a row
                // col amount should be determined via inner array length
                for (let col = 0; col < gameArray[row].length; col++) {
                    if (gameArray[row][col] === '') {
                        actionsArray.push(`${row}${col}`);
                    }
                }
            }
            return actionsArray;
        };

        function resultOfAction () {
            // result func returns state after that action was taken
        }

        function randomMove () {
            //placeholder function before minimax implementation
            const emptyCellIDs = gameflow.listAllActions(gameboard.array);
            
            // choose random index in the array (every index is an id of an empty cell)
            const min = Math.ceil(0);
            const max = Math.floor(emptyCellIDs.length);
            const randomIndex = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
            // return the chosen id, so that the displayController can fill the cell with O
            return emptyCellIDs[randomIndex];
        }

        return {player1, player2, evaluateState, checkGameOver, sayWhoseTurn, listAllActions, resultOfAction, randomMove};
    }
    )();

    // a module that manages the display (display controller)
    const displayController = (function () {
        // object with messages to be displayed on gameover or restart
        const messages = {
            win: "You win!",
            lose: "You lose!",
            tie: "It's a tie!",
            default: "Can you beat the algorithm?"
        };
        // getting all buttons and DOM content, that will be dynamic
        const restartBtn = document.getElementById("restart");
        const gameCells = document.querySelectorAll(".cell-content");
        const gameMessage = document.querySelector(".score-message");

        function displayGameEnd () {
                // after each turn check if game over and display the winner
            const gameEndCheck = gameflow.checkGameOver(gameboard.array);

            // if game over with the move display winning message
            if (gameEndCheck.gameOver) {
                switch (gameEndCheck.winner) {
                    case 'O':
                        gameMessage.textContent = messages.lose;
                        break;
                    case 'X':
                        gameMessage.textContent = messages.win;
                        break;
                    default:
                        gameMessage.textContent = messages.tie;
                        break;
                }
            }

            // change style of winning row/col/diagonal, if such exists
            // so the user can see what was the winning combination, better UX
            if (gameEndCheck.winningIds.length) {
                // loop over all winning combination cells
                // change class to .cell-content-game-over
                for (let counter = 0; counter < gameEndCheck.winningIds.length; counter++) {
                const winningCellID = gameEndCheck.winningIds[counter];
                const winningCell = document.getElementById(winningCellID);
                winningCell.classList.add('cell-content-game-over')
                }
            }
        }

        // displaying the content of the appropriate array cell in the DOM
        gameCells.forEach(gameCell => {
            // every cell-content id corresponds to the array position 
            gameCell.textContent = gameboard.array[gameCell.id.charAt(0)][gameCell.id.charAt(1)];

            // change class if cell isn't empty so that it doesn't change on hover
            if (gameCell.textContent !== '') {
                gameCell.parentNode.className = 'cell';
            }
        });

        // listens to clicks from users on the grid divs and displays turn results
        gameCells.forEach(gameCell => {
            gameCell.addEventListener('click', () => {
            if (gameCell.textContent === '') {
                // human is 1, ai is 0
                // player moves getting displayed
                if (gameflow.sayWhoseTurn(gameboard.array) && !gameflow.checkGameOver(gameboard.array).gameOver) {
                    // PLAYER 1 turn (human)
                    // change gameboard array and the div content to X
                    gameboard.array[gameCell.id.charAt(0)][gameCell.id.charAt(1)] = gameflow.player1.sign;
                    gameCell.textContent = gameflow.player1.sign;
                    gameCell.parentNode.className = 'cell';
                    const randMoveID = gameflow.randomMove();
                    displayGameEnd();
                    
                    
                    // PLAYER 2 (bot turn)
                    if (randMoveID !== undefined) {
                        // bot only takes turn if game isn't over
                        if (!gameflow.checkGameOver(gameboard.array).gameOver) {
                            gameboard.array[randMoveID.charAt(0)][randMoveID.charAt(1)] = gameflow.player2.sign;
                            const aiCell = document.getElementById(randMoveID);
                            aiCell.textContent = gameflow.player2.sign;
                            aiCell.parentNode.className = 'cell';
                        }
                    }
                    displayGameEnd();
                }
            }
            });
        });

        restartBtn.addEventListener('click', () => {
            gameboard.array = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ];
            gameCells.forEach(gameCell => {
                // every cell-content id corresponds to the array position 
                gameCell.textContent = gameboard.array[gameCell.id.charAt(0)][gameCell.id.charAt(1)];
                // TODO need to also reset classes upon reset
                // remove cell-content-game-over but also set cells to empty
                gameCell.className = 'cell-content';
            });

            // reset message to the non game over one
            gameMessage.textContent = messages.default;
        });

    }
    )();

    const bot = (function () {
        /*
        implement minimax ai
        things needed:
        - [DONE in gameflow] function that says whose turn it is (given a gameboard array)
        - [DONE in gameflow] all possible actions (empty cells) (input gameboard array, output array of ids)
        - [TODO] a result function that takes 2 inputs: gameboard board + action, returns resulting state  
            without modifying the original board (deep copy of the board)
        - [DONE in gameflow] winner fu accepts board as input returns winner
        - [DONE in gameflow] is the game over?
        - [TODO] a utility function: If X has won the game, the utility is 1. If O has won the game, the utility is -1. If the game has ended in a tie, the utility is 0.
            will only get called if game is over
        - [TODO] minimax function: takes board as input, returns optimal move for the player or empty if game over
            minimax(state, depth, player)

        Pseudocode minimax:
        max === +1 ; min === -1;
        
        we could do a DFS but for every value calculation (utility function)
        the weight of the empty cells can be added (value = +1*(numEmptyCells+1)) for max winning (-1*(empties+1)) for min
        this way we could win in as few steps as possible
        // then propagate them back up to get the value of the move

        function minimax(gamestate, depth, player) {
        if (player = max) then
        keeping track of the best score
            best = [-1, -1, -infinity]
        else
            best = [-1, -1, +infinity]

        if (depth = 0 or gameover_method(true)) then
            score = evaluate_this_state_method(state) for player
            return [-1, -1, score]

            loop over empty cells in the valid_actions_array:

            execute move  on state

            [move, score] = minimax(s, depth - 1, -player)

            if (player = max) then
                if score > best.score then best = [move, score]
            else
                if score < best.score then best = [move, score]

        return best
    end

        }
        */
    } ());
    
});

