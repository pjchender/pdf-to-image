function half(arr: number[]): number[] {
  const elements: number[] = [];

  let n = arr.length - 1;
  while (n > 0) {
    n = Math.floor(n / 2);
    elements.push(arr[n]);
  }
  return elements;
}

function main() {
  const arr = [1, 3, 5, 7, 9];
  console.log('a', half(arr));
}

main();
