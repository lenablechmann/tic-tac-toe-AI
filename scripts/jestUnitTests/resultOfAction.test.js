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

// [TODO] a result function that takes inputs: 
// gameboard board + action (cell id as a string) + sign (as a string), returns resulting state  
function resultOfAction (gameArray, moveID, sign) {
    // deep copying gameArray with an ES6 destructuring
    let resultState = [...gameArray];
    resultState[parseInt(moveID.charAt(0))][parseInt(moveID.charAt(1))] = sign;
    return resultState;
};