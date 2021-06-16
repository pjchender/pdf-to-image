import { sleep } from '../utils/sleep';

/**
 * 使用 Promise.all 才會真的有一起跑
 */
export const example1 = async (): Promise<number[]> => {
  console.log('[example1] start');
  // 直接放進 Promise.all 是沒有用的
  const unusedPromises = [
    {
      id: 1,
      invoke: () => sleep('1-1', 1000),
    },
    {
      id: 2,
      invoke: () => sleep('1-2', 1000),
    },
    {
      id: 3,
      invoke: () => sleep('1-3', 1000),
    },
  ];

  // promises 裡面一定要直接是 Promise，使用 Promise.all 才會有用
  const promises = unusedPromises.map((p) => p.invoke());

  const results = await Promise.all(promises);

  console.log('example1', results);

  return results;
};

/**
 * 使用 for 每次都會等，不會有非同步執行的效果
 */
export const example2 = async (): Promise<void> => {
  console.log('[example2] start');

  // await 一定要直接對應到 Promise 才會有用
  const promises = [
    {
      id: 1,
      invoke: () => sleep('2-1', 1000),
    },
    {
      id: 2,
      invoke: () => sleep('2-2', 1000),
    },
    {
      id: 3,
      invoke: () => sleep('2-3', 1000),
    },
  ];

  for (let i = 0; i < promises.length; i++) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const result = await promises[i].invoke();
    console.log('example2', result);
  }
};

/**
 * 使用 for...of 每次都會等，不會有非同步執行的效果
 */
export const example3 = async (): Promise<void> => {
  console.log('[example3] start');

  // await 一定要直接對應到 Promise 才會有用
  const promises = [
    {
      id: 1,
      invoke: () => sleep('3-1', 1000),
    },
    {
      id: 2,
      invoke: () => sleep('3-2', 1000),
    },
    {
      id: 3,
      invoke: () => sleep('3-3', 1000),
    },
  ];

  for (const promise of promises) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const result = await promise.invoke();
    console.log('example3', result);
  }
};
