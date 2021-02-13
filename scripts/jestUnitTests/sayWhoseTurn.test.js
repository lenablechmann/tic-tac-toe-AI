const { test } = require("@jest/globals");

test("Empty array => player1's turn (X goes first)", () => {
  const input = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  expect(sayWhoseTurn(input)).toBe(1);
});

test("If there is more Xs, it should be Os turn", () => {
  const input = [
    ["", "", ""],
    ["", "", "X"],
    ["", "X", "O"],
  ];
  expect(sayWhoseTurn(input)).toBe(0);
});

test("If there is the same amount of X and O, it should be Xs turn", () => {
  const input = [
    ["", "", ""],
    ["", "O", "X"],
    ["", "X", "O"],
  ];
  expect(sayWhoseTurn(input)).toBe(1);
});
test("If there is more O, it should be Xs turn", () => {
  const input = [
    ["O", "O", ""],
    ["O", "O", "X"],
    ["O", "X", "O"],
  ];
  expect(sayWhoseTurn(input)).toBe(1);
});
test("Should accept any 2D array", () => {
  const input = [
    ["O", "O", "", ""],
    ["O", "O", "X", ""],
    ["O", "X", "O", "", ""],
  ];
  expect(sayWhoseTurn(input)).toBe(1);
});

// function that is being tested
function sayWhoseTurn(gameArray) {
  let xCounter = 0;
  let oCounter = 0;
  let emptyCounter = 0;
  // loop over the 2d array and count how many Os, Xs and empties
  for (let row of gameArray) {
    for (let column of row) {
      switch (column) {
        case "X":
          xCounter++;
          break;
        case "O":
          oCounter++;
          break;
        default:
          emptyCounter++;
          break;
      }
    }
  }

  if (xCounter === 0 && oCounter === 0) {
    console.log(
      `There is ${xCounter} X-s, ${oCounter} O-s and ${emptyCounter} empties.`
    );
    return 1;
  } else if (xCounter > oCounter) {
    console.log(
      `There is ${xCounter} X-s, ${oCounter} O-s and ${emptyCounter} empties.`
    );
    return 0;
  } else {
    console.log(
      `There is ${xCounter} X-s, ${oCounter} O-s and ${emptyCounter} empties.`
    );
    return 1;
  }
}
