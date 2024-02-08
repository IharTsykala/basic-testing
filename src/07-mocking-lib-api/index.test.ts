// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';

import { throttledGetDataFromApi } from './index';

jest.mock('lodash/throttle', () => ({
  default: jest.fn((fn) => fn),
  __esModule: true,
}));

jest.mock('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const RELATIVE_PATH = '/example';
const TIMEOUT = 10000;
const METHOD = 'create';
const DATA_MOCK = {
  name: 'Ihar',
  surnname: 'Tsykala',
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockReturnObject = {
      get: jest.fn().mockReturnValue({ data: {} }),
    };
    const axiosResultMock = jest
      .spyOn(axios, METHOD)
      .mockReturnValue(mockReturnObject as unknown as AxiosInstance);

    await throttledGetDataFromApi(BASE_URL);

    expect(axiosResultMock).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMockAxios = jest.fn().mockReturnValue({ data: {} });
    const mockReturnObject = {
      get: getMockAxios,
    };

    jest
      .spyOn(axios, METHOD)
      .mockReturnValue(mockReturnObject as unknown as AxiosInstance);

    jest.advanceTimersByTime(TIMEOUT);
    await throttledGetDataFromApi(RELATIVE_PATH);

    expect(getMockAxios).toHaveBeenCalledWith(RELATIVE_PATH);
  });

  test('should return response data', async () => {
    const mockReturnObject = {
      get: jest.fn().mockReturnValue({ data: DATA_MOCK }),
    };

    jest
      .spyOn(axios, METHOD)
      .mockReturnValue(mockReturnObject as unknown as AxiosInstance);

    jest.advanceTimersByTime(TIMEOUT);

    expect(await throttledGetDataFromApi(RELATIVE_PATH)).toEqual(DATA_MOCK);
  });
});
