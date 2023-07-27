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
    // don't check first row i=0...
    for (let i = 1; i < gameHeight - 1; i++) {
      // first row  do nothing
      // first column and alst column do nothing
      for (let j = 1; j < gameLength - 2; j++) {
        if (j === Math.floor(gameLength / 2)) {
          dummyBoard[i][j] = "middle";

          const leftValue = dummyBoard[i][j - 1];
          const rightValue = dummyBoard[i][j + 1];
          const upValue = dummyBoard[i - 1][j];
          const rightUpPossibilities = [
            rightValue,
            rightValue + 1,
            rightValue - 1,
          ].filter((number) => number >= 0 && number <= 5);
          const upPossibilities = [upValue, upValue + 1, upValue - 1].filter(
            (number) => number >= 0 && number <= 5
          );
          const rightVsUp = upPossibilities.filter((element) =>
            rightUpPossibilities.includes(element)
          );
          const leftPossibilities = [
            leftValue,
            leftValue + 1,
            leftValue - 1,
          ].filter((number) => number >= 0 && number <= 5);
          const currentPossibilities = rightVsUp.filter((element) =>
            leftPossibilities.includes(element)
          );
          dummyBoard[i][j] =
            currentPossibilities[
              Math.floor(Math.random() * currentPossibilities.length)
            ];
          continue;
        }

        if (
          j !== Math.floor(gameLength / 2) &&
          j <= Math.floor(gameLength / 2 - 2)
        ) {
          // handle left value
          const upValue = dummyBoard[i - 1][j];
          // Look left
          const leftValue = dummyBoard[i][j - 1];
          // get all Possibilities
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

          // handle right value
          const previousRowLength = dummyBoard[i - 1].length;
          const rightUp = dummyBoard[i - 1][previousRowLength - 1 - j];
          const rightValue = dummyBoard[i][previousRowLength - j];

          const rightUpPossibilities = [
            rightUp,
            rightUp + 1,
            rightUp - 1,
          ].filter((number) => number >= 0 && number <= 5);

          const rightValuePossibilities = [
            rightValue,
            rightValue + 1,
            rightValue - 1,
          ].filter((number) => number >= 0 && number <= 5);

          const rightPossibilities = rightUpPossibilities.filter((element) =>
            rightValuePossibilities.includes(element)
          );

          dummyBoard[i][previousRowLength - 1 - j] =
            rightValuePossibilities[
              Math.floor(Math.random() * rightValuePossibilities.length)
            ];
          continue;
        }
      }
    }
    return dummyBoard;
  };
  generateBoard(height, length);
  console.log(dummyBoard);
  return dummyBoard;
}
