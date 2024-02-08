// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const modules = jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...modules,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  const log = 'log';

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyObserver = jest.spyOn(console, log);

    mockOne();
    mockTwo();
    mockThree();

    expect(spyObserver).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const spyObserver = jest.spyOn(console, log);
    const params = 'I am not mocked';

    unmockedFunction();

    expect(spyObserver).toHaveBeenCalledWith(params);
  });
});
