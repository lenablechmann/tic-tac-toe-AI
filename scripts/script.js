// adding this check, so that the script tag can stay at the start of HTML
document.addEventListener("DOMContentLoaded", function () {

    // create gameboard object, store the gameboard array inside of it (3x3)
    // factory for player objects
    // possibly an object to keep track of the gameplay/gameflow as well
    // function that allow players to leave marks on the gameboard in the DOM
    // make sure they can't access the spots, that are taken

    // which functions will go into the player objects? 
    // which into the gameboard?
    // which into the gameflow?

    // define initial state (empty board) perhaps with an array
    // create a playerFunction. Input: current state, output: whose turn it is. (for example empty board: x's turn, otherwise if there is more x than o, then o's turn, and the other way around)
    // function that returns possible actions from the current state (all empty cells are valid move possibilities)
    // result func returns state after that action was taken
    // terminal function checks wether game is over (3 in a row or board full)
    // utility function gives the state a value (1 for x winning, -1 o is winning or draw)

    // Adding minimax
    // max:
    // check if game is over
    // set initial value as low as possible (-infinity)
    // for every action in actions compare to the value you have: V = max(v, min-Value(Result(state,action)))

    // min:
    // check if game is over
    // set initial value as high as possible (+infinity)
    // for every action in actions compare to the value you have: V = min(v, max-Value(Result(state,action)))
});
