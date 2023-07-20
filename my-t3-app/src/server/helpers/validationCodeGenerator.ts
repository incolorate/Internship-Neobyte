export default function codeGenerator(): string {
  const whileArray: number[] = [];
  while (whileArray.length < 6) {
    while (whileArray.length < 6) {
      const currentNumber = Math.floor(Math.random() * 10);
      const previousNumber = whileArray[whileArray.length - 1];
      if (
        currentNumber != previousNumber &&
        currentNumber != previousNumber + 1
      ) {
        whileArray.push(currentNumber);
      }
    }
  }
  return whileArray.join("");
}
