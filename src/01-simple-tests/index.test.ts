// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 33,
      b: 44,
      action: Action.Add,
    });

    expect(result).toEqual(77);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 44,
      b: 33,
      action: Action.Subtract,
    });

    expect(result).toEqual(11);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 10,
      b: 33,
      action: Action.Multiply,
    });

    expect(result).toEqual(330);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 330,
      b: 10,
      action: Action.Divide,
    });

    expect(result).toEqual(33);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 9,
      b: 2,
      action: Action.Exponentiate,
    });

    expect(result).toEqual(81);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 33,
      b: 44,
      action: 'Action.Exponentiate',
    });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 33,
      b: null,
      action: 'Action.Exponentiate',
    });

    expect(result).toBeNull();
  });
});
