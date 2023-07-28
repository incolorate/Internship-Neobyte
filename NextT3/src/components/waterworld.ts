function getPossibilities(num, num2) {
  const num1Arr = [num, num + 1, num - 1].filter(
    (number) => number <= 3 && number >= 0
  );
  const num2Arr = [num2, num2 + 1, num2 - 1].filter(
    (number) => number <= 3 && number >= 0
  );
  const currentPossibilities = num1Arr.filter((element) =>
    num2Arr.includes(element)
  );

  return currentPossibilities;
}

// Generate a blue map
const generateObject = (height, length) => {
  let dummyBoard = {};
  for (let i = 0; i < height; i++) {
    dummyBoard[i] = [];
    for (let j = 0; j < length; j++) {
      // first row/last row
      if (i === 0 || i === height - 1) {
        dummyBoard[i].push(0);
        continue;
      }

      // first column/ last column
      if (j === 0 || j === length - 1) {
        dummyBoard[i][j] = 0;
        continue;
      }
      dummyBoard[i].push(0);
    }
  }
  return dummyBoard;
};

export default function waterWorld(height, length) {
  const dummyBoard = generateObject(height, length);

  const validateBoard = () => {
    // take each surounding block and valdiate it
    for (let i = 1; i < length - 1; i++) {
      for (let j = 1; j < length - 1; j++) {
        const mainBlock = dummyBoard[i][j];
        // surrounding blocks
        const left = dummyBoard[i][j - 1];
        const right = dummyBoard[i][j + 1];
        const up = dummyBoard[i - 1][j];
        const down = dummyBoard[i + 1][j];
        if (
          Math.abs(mainBlock - left) > 1 ||
          Math.abs(mainBlock - right) > 1 ||
          Math.abs(mainBlock - up) > 1 ||
          Math.abs(mainBlock - down) > 1
        ) {
          generateBoard(height, length);
        }
      }
    }
  };

  const generateBoard = (height, length) => {
    //  don't touch borders i j 1
    for (let i = 1; i < height - 1; i++) {
      for (let j = 1; j < length - 1; j++) {
        // let's go row by row if undefined generate new board
        const lookUp = dummyBoard[i - 1][j + 1];
        const lookLeft = dummyBoard[i][j - 1];
        const posib = getPossibilities(lookUp, lookLeft);
        dummyBoard[i][j] = posib[Math.floor(Math.random() * posib.length)];
      }
    }
    validateBoard();
  };

  generateBoard(height, length);
  console.log(dummyBoard);
  return dummyBoard;
}
