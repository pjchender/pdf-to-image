import { avg, sum3 } from '../src/sample';

describe('avg should calculate an average properly', () => {
  test('three positive numbers', () => {
    expect(avg(3, 4, 5)).toBe(4);
  });

  test('two negative numbers', () => {
    expect(avg(3, -4, -5)).toBe(-2);
  });
});

describe('sum3 should calculate a sum properly', () => {
  it('three positive number', () => {
    expect(sum3(3, 4, 5)).toBe(12);
  });

  it('two negative numbers', () => {
    expect(sum3(3, -4, -5)).toBe(-6);
  });
});
