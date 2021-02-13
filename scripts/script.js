// adding this check, so that the script tag can stay at the start of HTML
document.addEventListener("DOMContentLoaded", function () {
    // create gameboard object, store the gameboard array inside of it (3x3)
    const gameboard = {
        array: [
            ['', '', ''],
            ['O', 'X', ''],
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

    // a module that manages the display (display controller)
    const displayController = (function () {

        // displaying the content of the appropriate array cell in the DOM
        const gameCells = document.querySelectorAll(".cell-content");
        gameCells.forEach(gameCell => {
            // every cell-content id corresponds to the array position 
            gameCell.textContent = gameboard.array[gameCell.id.charAt(0)][gameCell.id.charAt(1)];

            // change class if cell isn't empty so that it doesn't change on hover
            if (gameCell.textContent !== '') {
                gameCell.parentNode.className = 'cell';
            }
        });

        // listens to clicks from users on the grid divs, checks if div
        // is empty or full. if empty and users turn
        gameCells.forEach(gameCell => {
            gameCell.addEventListener('click', () => {
            if (gameCell.textContent === '') {
                // human is 1, ai is 0
                if (gameflow.sayWhoseTurn(gameboard.array)) {
                    // change gameboard array and the div content to X
                    gameboard.array[gameCell.id.charAt(0)][gameCell.id.charAt(1)] = gameflow.player1.sign;
                    gameCell.textContent = gameflow.player1.sign;
                    gameCell.parentNode.className = 'cell';
                    
                }
                    console.table(gameboard.array);
                    console.log(gameflow.listAllActions(gameboard.array));

            }
            });
        });

        // add a small sleep timer before displaying the AI turn
        // displays winning message if game over
        // optional: displays winning diagonal/row
        return {};
    }
    )();

    // an iife module to keep track of the gameplay/gameflow as well
    const gameflow = (function () {
        // create two players
        const player1 = createPlayer(true);
        const player2 = createPlayer(false);

        function evaluateState() {
            // public method that evaluates state of the board (for minimax)
            // utility function gives the state a value (1 for x winning, -1 o is winning or draw)
        };

        function checkGameOver() {
            // public method that says if game over or nah
            // checks wether game is over (3 in a row or board full)
        };

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
            gameflow.listAllActions(gameboard.array);
        }

        return {player1, player2, evaluateState, checkGameOver, sayWhoseTurn, listAllActions, resultOfAction, randomMove};
    }
    )();

});

