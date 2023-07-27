import Layout from "~/components/Layout";
import { useState } from "react";
import classNames from "classnames";
import waterWorld from "~/components/waterworld";

export default function AlgoGame() {
  const [boardHeight, setBoardHeight] = useState(0);
  const [boardLength, setBoardLength] = useState(0);
  const [gameBoard, setGameBoard] = useState<object>({});
  const [dominant, setDominant] = useState(5);

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
  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setDominant(Math.floor(newValue));
  };

  return (
    <Layout>
      <div>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex gap-12">
            <div className="flex-1">
              <label htmlFor="height" className="block text-xl text-slate-700">
                Height
              </label>
              <input
                id="height"
                type="number"
                placeholder="Height"
                onChange={(e) => setBoardHeight(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="length" className="block text-xl text-slate-700">
                Length
              </label>
              <input
                id="length"
                type="number"
                placeholder="Length"
                onChange={(e) => setBoardLength(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="default-range"
              className="mb-2  flex justify-between text-sm font-medium text-gray-900 dark:text-white"
            >
              <p className="text-xl text-blue-700">Water</p>
              <p className="text-xl text-zinc-900">Random</p>
              <p className="text-xl text-yellow-800">Mountain</p>
            </label>
            <input
              id="default-range"
              type="range"
              min="1"
              max="10"
              value={dominant}
              onChange={handleSliderChange}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
            />
          </div>
        </div>
        <div className="mt-24 flex w-full justify-center">
          <div className="flex gap-4">
            <button
              className="bg-yellow-400 p-4 px-20 text-2xl"
              onClick={() => generateBoard(boardLength, boardHeight)}
            >
              Generate
            </button>
            <button
              className="bg-blue-700 p-4 px-20 text-2xl text-white"
              onClick={() => setGameBoard(waterWorld(boardHeight, boardLength))}
            >
              Waterworld
            </button>
          </div>
        </div>
        <div className="mt-5 flex  justify-center gap-3">
          <div>
            {Object.keys(gameBoard).map((row) => {
              return (
                <div className="flex" key={row}>
                  {gameBoard[row].map((number, index) => {
                    return (
                      <div
                        className={classNames("h-10 w-10", {
                          "bg-blue-500": number === 0,
                          "bg-yellow-500": number === 1,
                          "bg-orange-500": number === 2,
                          "bg-orange-600": number === 3,
                          "bg-orange-800": number === 4,
                          "bg-white": number === 5,
                        })}
                        key={index}
                      ></div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
