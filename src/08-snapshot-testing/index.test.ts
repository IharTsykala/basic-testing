// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const list = generateLinkedList(['one', 'two', 'three']);

const LIST_TREE = {
  next: {
    next: {
      next: {
        next: null,
        value: null,
      },
      value: 'three',
    },
    value: 'two',
  },
  value: 'one',
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(list).toStrictEqual(LIST_TREE);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(list).toMatchInlineSnapshot(LIST_TREE);
  });
});
