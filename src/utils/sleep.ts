export const sleep = (id: string, millisecond: number): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(`resolve id(${id}) millisecond(${millisecond})`);
      return resolve(millisecond);
    }, millisecond);
  });
