export default function waterWorld(height, length) {
  const dummyBoard = {};

  const generateObject = (height, length) => {
    for (i = 0; i < height; i++) {
      dummyBoard[i] = [];
      for (j = 0; j < length; j++) {
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
  };
  generateObject(height, length);

  const generateBoard = (gameHeight, gameLength) => {
    for (let i = 1; i < gameHeight - 1; i++) {
      for (let j = 1; j < gameLength - 1; j++) {
        // check up left right down
        // toate randurile inafara de ultimul si toate coloanele inafara de ultima
        if (j !== gameLength - 2 && i !== gameHeight - 2) {
          const upValue = dummyBoard[i - 1][j];
          const leftValue = dummyBoard[i][j - 1];
          const upPossibilities = [upValue, upValue + 1, upValue - 1].filter(
            (number) => number >= 0 && number <= 5
          );
          const leftPossibilities = [
            leftValue,
            leftValue + 1,
            leftValue - 1,
          ].filter((number) => number >= 0 && number <= 5);
          const currentPossibilities = upPossibilities.filter((element) =>
            leftPossibilities.includes(element)
          );
          dummyBoard[i][j] =
            currentPossibilities[
              Math.floor(Math.random() * currentPossibilities.length)
            ];
          continue;
        }

        // ultima coloana dar nu la ultimul rand
        if (j === gameLength - 2 && i !== gameHeight - 2) {
          const upValue = dummyBoard[i - 1][j];
          const leftValue = dummyBoard[i][j - 1];
          const upPossibilities = [upValue, upValue + 1, upValue - 1].filter(
            (number) => number >= 0 && number <= 5
          );
          const leftPossibilities = [
            leftValue,
            leftValue + 1,
            leftValue - 1,
          ].filter((number) => number >= 0 && number <= 5);
          const currentPossibilities = upPossibilities.filter((element) =>
            leftPossibilities.includes(element)
          );
          const rightValue = dummyBoard[i][j + 1];
          const rightPossibilities = [
            rightValue,
            rightValue + 1,
            rightValue - 1,
          ].filter((number) => number >= 0 && number <= 5);
          const possibilities = rightPossibilities.filter((element) =>
            currentPossibilities.includes(element)
          );
          dummyBoard[i][j] =
            possibilities[Math.floor(Math.random() * possibilities.length)];
          continue;
        }

        // ultimul rand dar nu ultima coloana sus stanga jos
        if (i == gameHeight - 2 && j !== gameLength - 2) {
          const upValue = dummyBoard[i - 1][j];
          const leftValue = dummyBoard[i][j - 1];
          const upPossibilities = [upValue, upValue + 1, upValue - 1].filter(
            (number) => number >= 0 && number <= 5
          );
          const leftPossibilities = [
            leftValue,
            leftValue + 1,
            leftValue - 1,
          ].filter((number) => number >= 0 && number <= 5);
          const currentPossibilities = upPossibilities.filter((element) =>
            leftPossibilities.includes(element)
          );

          const downValue = dummyBoard[i + 1][j];

          const downPossibilities = [0, 1].filter(
            (number) => number >= 0 && number <= 5
          );

          const finnal = downPossibilities.filter((element) =>
            currentPossibilities.includes(element)
          );
          dummyBoard[i][j] = finnal[Math.floor(Math.random() * finnal.length)];
        }
      }
    }
    return dummyBoard;
  };
  generateBoard(height, length);
  console.log(dummyBoard);
  return dummyBoard;
}
