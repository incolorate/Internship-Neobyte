import Layout from "~/components/Layout";
import { useState } from "react";
import classNames from "classnames";

export default function AlgoGame() {
  function getOccurrence(array, value) {
    if (!Array.isArray(array)) {
      console.error('The "array" argument must be an array.');
      return 0;
    }

    let count = 0;
    array?.forEach((v) => v === value && count++);
    console.log("this is count", count);
    return count;
  }
  const generateBoard = (height, length) => {
    const dummyBoard = {};
    const blocks = [0, 1, 2, 3, 4, 5];

    // Create the columns
    for (let i = 0; i < height; i++) {
      dummyBoard[i] = [];
      // Generate rows
      for (let j = 0; j < length; j++) {
        // first iteration we don't have to look
        // get a random number
        // if we have to start with water push a 0 instead
        if (i === 0 && j === 0) {
          dummyBoard[i].push(blocks[Math.floor(Math.random() * 5)]);
          continue;
        }
        // now we look to the left for the first row
        if (i === 0) {
          const leftValue = dummyBoard[i][j - 1];
          // = + and - to left value
          const currentPossibilities = [
            leftValue,
            leftValue + 1,
            leftValue - 1,
          ].filter((number) => number >= 0 && number <= 5);
          dummyBoard[i].push(
            currentPossibilities[
              Math.floor(Math.random() * currentPossibilities.length)
            ]
          );
          continue;
        }

        //Now we look at the other rows
        //The first value of each row will only look up
        if (j === 0) {
          const upValue = dummyBoard[i - 1][j];
          const currentPossibilities = [
            upValue,
            upValue + 1,
            upValue - 1,
          ].filter((number) => number >= 0 && number <= 5);
          dummyBoard[i].push(
            currentPossibilities[
              Math.floor(Math.random() * currentPossibilities.length)
            ]
          );
          continue;
        }

        //Now we look left and up
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
        // Get common values
        const currentPossibilities = upPossibilities.filter((element) =>
          leftPossibilities.includes(element)
        );
        dummyBoard[i].push(
          currentPossibilities[
            Math.floor(Math.random() * currentPossibilities.length)
          ]
        );
        continue;
      }
    }
    const checkForValues = Object.values(dummyBoard).toString();
    console.log(Math.floor(dominant / 2), "dominant");
    // Check occurrence of selected block
    const occurrence = getOccurrence(
      Object.values(dummyBoard).flat(1),
      Math.floor(dominant / 2)
    );

    if (dominant !== 5 && occurrence < (height * length) / 3) {
      return generateBoard(height, length);
    }

    if (checkForValues.includes(5) && checkForValues.includes(0)) {
      //   generate a dominant water / mountain board
      return setGameBoard(dummyBoard);
    }
    return generateBoard(height, length);
  };

  return <Layout></Layout>;
}
