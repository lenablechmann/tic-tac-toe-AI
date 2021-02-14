const { test } = require("@jest/globals");

test("Should return falsy boolean for game over + empty array if still empty cells present and no winner", () => {
  const input = [
      ['X', 'O', 'X'],
      ['O', 'O', 'X'],
      ['X', '', 'O'],
  ];
  const result = {
      gameOver: false,
      winningIds: [],
      winner: ''
  };
  expect(checkGameOver(input)).toEqual(result);
});

test("Should return truthy boolean for game over + empty array for a draw", () => {
  const input = [
      ['O', 'X', 'X'],
      ['X', 'O', 'O'],
      ['X', 'O', 'X'],
  ];
  const result = {
      gameOver: true,
      winningIds: [],
      winner: ''
  };
  expect(checkGameOver(input)).toEqual(result);
});

xtest("Should return truthy boolean for game over + winning ids if it's a winning row", () => {
  const input = [
      ['', '', 'X'],
      ['O', 'O', 'O'],
      ['X', '', 'X'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['10', '11', '12'],
      winner: ''
  };
  expect(checkGameOver(input)).toEqual(result);
});

xtest("Should return truthy boolean for game over + winning ids if it's a winning column", () => {
  const input = [
      ['', 'X', 'X'],
      ['O', 'O', 'X'],
      ['X', '', 'X'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['02', '12', '22'],
      winner: ''
  };
  expect(checkGameOver(input)).toEqual(result);
});

xtest("Should return truthy boolean for game over + winning ids if it's a winning diagonal", () => {
  const input = [
      ['O', 'X', 'X'],
      ['O', 'O', 'X'],
      ['X', '', 'O'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['00', '11', '22'],
      winner: ''
  };
  expect(checkGameOver(input)).toEqual(result);
});
xtest("Should return truthy boolean for game over + winning ids if it's another winning diagonal", () => {
  const input = [
      ['O', 'O', 'X'],
      ['O', 'X', 'X'],
      ['X', '', 'O'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['02', '11', '20'],
      winner: ''
  };
  expect(checkGameOver(input)).toEqual(result);
});


// function that is being tested
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
    console.dir(digitsArray);
    console.log("There are " + emptiesCounter + " empty cells.");
    if (!emptiesCounter) {
        // if the gameboard is full, game is over
        console.log("no empties")
        winningSummary.gameOver = true;
    }
    // sums rows
    const rowSum = digitsArray.map(r => r.reduce((a, b) => a + b));
    console.log(`The sum of rows is ${rowSum}`)
    // loops through the new array, and finds any winning row
    for (let i = 0; i < rowSum.length; i++) {
        if (rowSum[i] === 0) {
            winningSummary.winner = 'O';
            // the index of rowSum is the corresponding row in the gameBoard
            // meaning the ids will be 'i' and all numbers from 0 to array.length
        }
        else if (rowSum[i] === digitsArray.length) {
            winningSummary.winner = 'X';
            // the index of rowSum is the corresponding row in the gameBoard
            // meaning the ids will be 'i' and all numbers from 0 to array.length

        }
    }

    // sums of columns
    const colSum = digitsArray.reduce((a, b) => a.map((x, i) => x + b[i]));
    console.log(`The sum of columns is ${colSum}`)

    //sum of diagonals
    const sumDiagonals = {main: 0, second: 0};
    for (let i = 0; i < digitsArray.length; i++) {
        sumDiagonals.main += digitsArray[i][i];
        sumDiagonals.second += digitsArray[i][digitsArray.length-i-1];
    }
    console.log(`The sum of diagonal1 is ${sumDiagonals.main}`)
    console.log(`The sum of diagonal2 is ${sumDiagonals.second}`)

    // loop over the array and sum up every row. If row sum === array.lengthx2 then X won
    // if row sum === 0, 0 won
    // if row > 5000, not a winning row
    // if column sum === array.length, X won

    return winningSummary;
}
