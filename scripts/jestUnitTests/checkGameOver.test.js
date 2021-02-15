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

test("Should return truthy boolean for game over + empty array for a draw, no winner", () => {
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

test("O winning with a row should return game over, ids and O as winnter", () => {
  const input = [
      ['', '', 'X'],
      ['O', 'O', 'O'],
      ['X', '', 'X'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['10', '11', '12'],
      winner: 'O'
  };
  expect(checkGameOver(input)).toEqual(result);
});

test("X winning with a row, returns game over + winning ids", () => {
  const input = [
      ['O', 'O', 'X'],
      ['X', 'O', 'O'],
      ['X', 'X', 'X'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['20', '21', '22'],
      winner: 'X'
  };
  expect(checkGameOver(input)).toEqual(result);
});

test("Should return truthy boolean for game over + winning ids of column, winner is X", () => {
  const input = [
      ['', 'X', 'X'],
      ['O', 'O', 'X'],
      ['X', '', 'X'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['02', '12', '22'],
      winner: 'X'
  };
  expect(checkGameOver(input)).toEqual(result);
});

test("Should return truthy boolean for game over + winning ids of column, winner is O", () => {
  const input = [
      ['', 'O', 'X'],
      ['X', 'O', 'O'],
      ['X', 'O', 'X'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['01', '11', '21'],
      winner: 'O'
  };
  expect(checkGameOver(input)).toEqual(result);
});

test("Should return truthy boolean for game over + winning ids of the winning diagonal", () => {
  const input = [
      ['O', 'X', 'X'],
      ['O', 'O', 'X'],
      ['X', '', 'O'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['00', '11', '22'],
      winner: 'O'
  };
  expect(checkGameOver(input)).toEqual(result);
});
test("Should return truthy boolean for game over + winning ids if it's another winning diagonal", () => {
  const input = [
      ['O', 'O', 'X'],
      ['O', 'X', 'X'],
      ['X', '', 'O'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['02', '11', '20'],
      winner: 'X'
  };
  expect(checkGameOver(input)).toEqual(result);
});

test("Should work with differently sized arrays, like 5x5", () => {
  const input = [
      ['O', '', 'X', '', ''],
      ['O', 'O', 'O', '', ''],
      ['X', 'X', 'X', 'X', 'X'],
      ['', '', 'O', 'O', 'X'],
      ['', '', 'O', 'X', 'O'],
  ];
  const result = {
      gameOver: true,
      winningIds: ['20', '21', '22', '23', '24'],
      winner: 'X'
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
    // console.dir(digitsArray);
    // console.log("There are " + emptiesCounter + " empty cells.");
    if (!emptiesCounter) {
        // if the gameboard is full, game is over
        winningSummary.gameOver = true;
    }
    // sums rows
    const rowSum = digitsArray.map(r => r.reduce((a, b) => a + b));
    console.log(`The sum of rows is ${rowSum}`)
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
    // console.log(`The sum of columns is ${colSum}`)
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
