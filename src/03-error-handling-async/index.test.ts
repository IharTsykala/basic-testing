// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', () => {
    const value = 'value';

    expect(resolveValue(value)).resolves.toEqual(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const value = 'value';

    const callErrorFunc = () => throwError(value);

    expect(callErrorFunc).toThrow(value);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', () => {
    expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
