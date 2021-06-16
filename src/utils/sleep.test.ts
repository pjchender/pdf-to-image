import { sleep } from './sleep';

describe('sleep', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  test('waits 100ms before continue', async () => {
    const sleepMilliseconds = 100;

    await sleep('fakeId', sleepMilliseconds);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      sleepMilliseconds
    );
  });
});
