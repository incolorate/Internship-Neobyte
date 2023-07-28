export default function getPossibilities(value, min, max) {
  let possibilitiesArray = [value, value + 1, value - 1].filter(
    (number) => number >= min && number <= max
  );
  return possibilitiesArray[
    Math.floor(Math.random() * possibilitiesArray.length)
  ];
}
