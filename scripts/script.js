// adding this check, so that the script tag can stay at the start of HTML
document.addEventListener("DOMContentLoaded", function () {
    // create gameboard object, store the gameboard array inside of it (3x3)
        // define initial state (empty board) perhaps with an array
        // current board should be a public property but not directly editable from outside?
        // empty cells should also be a public property

    // factory for player objects
        // which sign (property)
        // turn (boolean)
        // human or ai (boolean)
    
    // an object to keep track of the gameplay/gameflow as well
        // public method that evaluates state of the board (for minimax)
        // public method that says if game over or nah
        // public property whose turn

        // create a playerFunction. Input: current state, output: whose turn it is. (for example empty board: x's turn, otherwise if there is more x than o, then o's turn, and the other way around)
        // function that returns possible actions from the current state (all empty cells are valid move possibilities)
        // result func returns state after that action was taken
        // terminal function checks wether game is over (3 in a row or board full)
        // utility function gives the state a value (1 for x winning, -1 o is winning or draw)

    // a module that manages the display (display controller)
        // accesses public methods and properties exposed by other modules
        // uses the info to modify the DOM accordingly

        // checks board and updates the display to represent current state
        // cells that aren't empty, don't call any functions
        // add a small sleep timer before displaying the AI turn
        // displays winning message if game over
        // optional: displays winning diagonal/row


});
