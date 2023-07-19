export default function codeGenerator(): string {
  const arr: number[] = [];
  while (arr.length < 6) {
    const number = Math.floor(Math.random() * 10);
    if (arr.length === 0 || arr[arr.length - 1] ? +1 !== number : number) {
      arr.push(number);
    }
  }
  return arr.join("");
}
