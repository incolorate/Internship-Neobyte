function getPossibilities(num, num2) {
  const num1Arr = [num, num + 1, num - 1].filter(
    (number) => number <= 5 && number >= 0
  );
  const num2Arr = [num2, num2 + 1, num2 - 1].filter(
    (number) => number <= 5 && number >= 0
  );
  const currentPossibilities = num1Arr.filter((element) =>
    num2Arr.includes(element)
  );

  return currentPossibilities;
}

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
      dummyBoard[i].push(-1);
    }
  }
  return dummyBoard;
};

export default function waterWorld(height, length) {
  const dummyBoard = generateObject(height, length);

  const generateBoard = (height, length) => {
    // first row will get incremented
    let row = 1;

    for (let i = 1; i < 2; i++) {
      // each i fill 1 circle
      for (let j = 1; j < height - 1; j++) {
        // J will track the height
        for (let o = 1; o < length - 1; o++) {
          if (o === 1) {
            const lookUp = dummyBoard[j - 1][o];
            const lookLeft = dummyBoard[j][o - 1];
            const posib = getPossibilities(lookUp, lookLeft);
            dummyBoard[j][o] = posib[Math.floor(Math.random() * posib.length)];
            continue;
          }

          // primu rand
          if (j === row) {
            const lookUp = dummyBoard[j - 1][o];
            const lookLeft = dummyBoard[j][o - 1];
            const posib = getPossibilities(lookUp, lookLeft);
            dummyBoard[j][o] = posib[Math.floor(Math.random() * posib.length)];
            console.log("this", o);
            continue;
          }

          // ultimu rand
          if (j === height - 1 - row) {
            const lookLeft = dummyBoard[j][o - 1];
            const lookDown = dummyBoard[j + 1][o];
            const posib = getPossibilities(lookLeft, lookDown);
            dummyBoard[j][o] = posib[Math.floor(Math.random() * posib.length)];
          }

          // ultima coloana
          if (o === length - 2) {
            dummyBoard[j][o] = 1;
          }
        }
      }
      row++;
    }

    return dummyBoard;
  };
  generateBoard(height, length);
  console.log(dummyBoard);
  return dummyBoard;
}
