function half(arr: number[]): number[] {
  const elements: number[] = [];

  let n = arr.length - 1;
  while (n > 0) {
    n = Math.floor(n / 2);
    elements.push(arr[n]);
  }
  return elements;
}

export default half;
