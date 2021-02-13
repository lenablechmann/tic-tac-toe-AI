const { test } = require("@jest/globals");

test("Should return ids of empty cells in an array", () => {
  const input = [
      ['', '', 'O'],
      ['O', 'X', ''],
      ['', '', 'X'],
  ];
  expect(listAllActions(input)).toEqual(['00', '01', '12', '20', '21']);
});

test("Should return ids of all cells in an empty array", () => {
  const input = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
  ];
  expect(listAllActions(input)).toEqual(['00', '01', '02', '10', '11', '12', '20', '21', '22']);
});

test("Should return an empty array if no empty cells", () => {
  const input = [
      ['O', 'X', 'O'],
      ['O', 'X', 'X'],
      ['X', 'O', 'X'],
  ];
  expect(listAllActions(input)).toEqual([]);
});

// function that is being tested
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
