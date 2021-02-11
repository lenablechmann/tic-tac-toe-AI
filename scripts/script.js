// adding this check, so that the script tag can stay at the start of HTML
document.addEventListener("DOMContentLoaded", function () {
    // create gameboard object, store the gameboard array inside of it (3x3)
    const gameboard = {
        array: [
            ['', 'X', ''],
            ['', '', 'O'],
            ['', 'X', ''],
        ]
    };
    // testing accessing the array values, shows how to change em when necessary
    // console.log(gameboard.array[1][2]); // logs "O" 

    
    // factory for player objects 
    // receives boolean (isHuman? true or false), returns player properties
    function createPlayer (isHuman) {
        let type = true;
        // x goes first, so human goes first to have a chance at a tie
        let sign = 'X'; 

        if (!isHuman) {
            // AI isn't human, and will go second with the oh
            type = false;
            sign = 'O'; 
        }
        return {sign, type};
    };

    // a module that manages the display (display controller)
    const displayController = (function () {
        const gameCells = document.querySelectorAll(".cell-content");

        // loops over the .cell-content divs and gives them textContent of
        // the gameboard
        gameCells.forEach(gameCell => {
            // every cell-content id corresponds to the array position, just gotta 
            // split it
            console.log(`game cell id is ${gameCell.id}`)
            const splitCellId = gameCell.id.split("");
            console.log (`content of the board here is: ${gameboard.array[splitCellId[0]][splitCellId[1]]}`);
        });
        // if textcontent is '', change their parent div class to "cell empty"

        // listens to clicks from users on the grid divs, checks if div
        // is empty or full. if empty and users turn
        //  changes the array cell content and sets the parent class to "cell"

        // checks board and updates the display to represent current state
        // cells that aren't empty, don't call any functions
        // add a small sleep timer before displaying the AI turn
        // displays winning message if game over
        // optional: displays winning diagonal/row
        return {};
    }
    )();

    // an iife module to keep track of the gameplay/gameflow as well
    const gameflow = (function () {
        // public method that evaluates state of the board (for minimax)
        // public method that says if game over or nah
        // public property whose turn

        // create a playerFunction. Input: current state, output: whose turn it is. (for example empty board: x's turn, otherwise if there is more x than o, then o's turn, and the other way around)
        // function that returns possible actions from the current state (all empty cells are valid move possibilities)
        // result func returns state after that action was taken
        // terminal function checks wether game is over (3 in a row or board full)
        // utility function gives the state a value (1 for x winning, -1 o is winning or draw)
        return {};
    }
    )();

});
