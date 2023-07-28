export default function handleTwoDimensions(arr1, arr2) {
  const arr1ossibilities = [arr1, arr1 + 1, arr1 - 1].filter(
    (number) => number >= 0 && number <= 5
  );
  const arr2possibilities = [arr2, arr2 + 1, arr2 - 1].filter(
    (number) => number >= 0 && number <= 5
  );
  // Get common values
  const currentPossibilities = arr1ossibilities.filter((element) =>
    arr2possibilities.includes(element)
  );

  return currentPossibilities[
    Math.floor(Math.random() * currentPossibilities.length)
  ];
}
