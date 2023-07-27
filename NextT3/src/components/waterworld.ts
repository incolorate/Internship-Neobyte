export default function waterWorld(height, length, dominant) {
  const dummyBoard = {};
  const generateBoard = (gameHeight, gameLength) => {
    for (let i = 0; i < gameHeight; i++) {
      dummyBoard[i] = [];
      for (let j = 0; j < gameLength; j++) {
        //  surround the board with water
        // first row case and first column case
        if (i === 0 || j === 0) {
          dummyBoard[i].push(0);
          continue;
        }
        //  last column case
        if (j === gameLength - 1) {
          dummyBoard[i].push(0);
          continue;
        }

        // Last row
        if (i === gameHeight - 1) {
          dummyBoard[i].push(0);
          continue;
        }

        // start from left let middle unchecked
        if (i !== 0 && j < Math.floor(gameLength / 2)) {
          const lookUp = dummyBoard[i - 1][j];
          const possibleUpValues = [lookUp, lookUp - 1, lookUp + 1].filter(
            (number) => number <= 5 && number >= 0
          );
          const lookLeft = dummyBoard[i][j - 1];
          const possibleLeftValues = [
            lookLeft,
            lookLeft + 1,
            lookLeft - 1,
          ].filter((number) => number <= 5 && number >= 0);
          const currentPossibilities = possibleUpValues.filter((element) =>
            possibleLeftValues.includes(element)
          );

          dummyBoard[i].push(
            currentPossibilities[
              Math.floor(Math.random() * currentPossibilities.length)
            ]
          );
        }

        // look at right part
        if (i !== 0 && j > Math.floor(gameLength / 2)) {
          const lookUp = dummyBoard[i - 1][j];
          const lookRight = dummyBoard[i][gameLength - 1 - j];
          const possibleUpValues = [lookUp, lookUp - 1, lookUp + 1].filter(
            (number) => number <= 5 && number >= 0
          );
          const possibleRightValues = [
            lookRight,
            lookRight - 1,
            lookRight + 1,
          ].filter((number) => number <= 5 && number >= 0);
          const currentPossibilities = possibleUpValues.filter((element) =>
            possibleRightValues.includes(element)
          );
          dummyBoard[i].push(
            currentPossibilities[
              Math.floor(Math.random() * currentPossibilities.length)
            ]
          );
          continue;
        }

        // look at middle
        if (i !== 0 && j === Math.floor(gameLength / 2)) {
          // look left look right and up
          const lookUp = dummyBoard[i - 1][j];
          const lookRight = dummyBoard[i][gameLength - 1 - j];
          const possibleUpValues = [lookUp, lookUp - 1, lookUp + 1].filter(
            (number) => number <= 5 && number >= 0
          );
          const possibleRightValues = [
            lookRight,
            lookRight - 1,
            lookRight + 1,
          ].filter((number) => number <= 5 && number >= 0);
          // get up and right posibilities
          const currentPossibilities = possibleUpValues.filter((element) =>
            possibleRightValues.includes(element)
          );
          // Look left const lookLeft = dummyBoard[i][j-1]
          const lookLeft = dummyBoard[i][j - 1];
          const possibleLeftValues = [
            lookLeft,
            lookLeft + 1,
            lookLeft - 1,
          ].filter((number) => number <= 5 && number >= 0);
          const actualPosib = currentPossibilities.filter((element) =>
            possibleLeftValues.includes(element)
          );
          dummyBoard[i].push(
            actualPosib[Math.floor(Math.random() * actualPosib.length)]
          );
          console.log("i was in middle");
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
