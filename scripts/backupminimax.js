  // backup
  // [TODO] minimax function: takes board as input, returns optimal move for the player or empty if game over
  function minimax(gameArrayOG) {
    // create a copy of the array
    let gameArrayCpy = gameArrayOG.map(inner => inner.slice())
    console.dir(gameArrayCpy);

    // create object that will have both best value and the appropriate move for O
    // who is a minimizer
    let best = {
        value : +Infinity,
        moveID : ''
    };
    // players are 0 and 1, x is 1, 0 is O
    // let's say x is 1, and is maximizer (the higher the value, the better). 
    // O is 0 and a minimizer (the lower the value of the board the better)
    function maximizer(gameArrayCpy){
        console.log("max got called");
        const actionsArray = listAllActions(gameArrayCpy);
        if (checkGameOver(gameArrayCpy).gameOver){
            console.log("current branch final value " + evaluateState(gameArrayCpy));
            const curValue = evaluateState(gameArrayCpy);
            // reset gameArray
            gameArrayCpy = gameArrayOG.map(inner => inner.slice())
            return curValue;
        }
        else {
            // Maximizer wants a max value, so we start off with the worst possible
            let value = -Infinity;

            // looping over every empty cell and finding the value that that cell would bring
            for (let index = 0; index < actionsArray.length; index++) {
                const action = actionsArray[index];
                // X is maximizer, resultOfAction also copies the array
                const actionResult = resultOfAction(gameArrayCpy, action, 'X');
                value = Math.max(value, minimizer(actionResult));
                if (value > best.value) {
                    best.value = value;
                    best.moveID = actionsArray[index];
                }
                return value;
            }
        }
    }
    function minimizer(gameArrayCpy){
        console.log("min got called");
        const actionsArray = listAllActions(gameArrayCpy);
        if (checkGameOver(gameArrayCpy).gameOver === true){
            return evaluateState(gameArrayCpy);
        }
        else {
            let value = +Infinity;
            // looping over every empty cell and finding the value that that cell would bring
            for (let index = 0; index < actionsArray.length; index++) {
                const action = actionsArray[index];
                // O is minimizer, resultOfAction also copies the array
                const actionResult = resultOfAction(gameArrayCpy, action, 'O');
                value = Math.min(value, maximizer(actionResult));
                // returning the best move, as it goes up the stack (recursively)
                if (value < best.value) {
                    best.value = value;
                    best.moveID = actionsArray[index];
                }
                return value;
            }
        }
    }
    if (!sayWhoseTurn(gameArrayCpy)) {
        minimizer(gameArrayCpy);
    }
    else {
        maximizer(gameArrayCpy);
    }
    console.log("optimal value is: " + best.value);
    return best.moveID;
};