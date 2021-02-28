import half from './half';

it('should return half of array', () => {
  expect(half([1, 3, 5, 7, 9])).toEqual([5, 3, 1]);
});
