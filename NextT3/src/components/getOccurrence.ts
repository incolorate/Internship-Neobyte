export default function getOccurrence(array, value) {
  if (!Array.isArray(array)) {
    console.error('The "array" argument must be an array.');
    return 0;
  }

  let count = 0;
  array?.forEach((v) => v === value && count++);

  return count;
}
