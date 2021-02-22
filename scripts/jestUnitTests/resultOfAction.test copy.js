const { test } = require("@jest/globals");

test("Should place appropriate sign in an array copy", () => {
  const gameArray = [
      ['', 'X', ''],
      ['O', '', 'X'],
      ['X', 'O', ''],
  ];
  const moveID = '02';
  const sign = 'O';
  const expectedResult = [
      ['', 'X', 'O'],
      ['O', '', 'X'],
      ['X', 'O', ''],
  ];
  expect(resultOfAction(gameArray, moveID, sign)).toEqual(expectedResult);
});

        function evaluateState(gameArray) {
            const winner = gameflow.checkGameOver(gameArray).winner;
            let value = 0;
            // X is maximizer, O is minimizer

            // user wins
            if (winner === 'X'){
                // the more empty cells left the better for the player (quicker win)
                value = 1 * (gameflow.listAllActions.length + 1);
            }
            // ai wins
            else if (winner === 'O'){
                value = (-1) * (gameflow.listAllActions.length + 1);
            }