// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 11, b: 22, action: Action.Add, expect: 33 },
  { a: 22, b: 22, action: Action.Add, expect: 44 },
  { a: 33, b: 22, action: Action.Add, expect: 55 },
  { a: 44, b: 33, action: Action.Subtract, expect: 11 },
  { a: 44, b: 10, action: Action.Multiply, expect: 440 },
  { a: 440, b: 10, action: Action.Divide, expect: 44 },
  { a: 9, b: 2, action: Action.Exponentiate, expect: 81 },
  { a: 44, b: 33, action: 'Action.Exponentiate', expect: null },
  { a: 44, b: '33', action: Action.Add, expect: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('test case № %#', (testCases) => {
    expect(simpleCalculator({ ...testCases })).toEqual(testCases.expect);
  });
});
