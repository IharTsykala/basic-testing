// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

const callback = jest.fn();

const TIMEOUT = 300;
const INTERVAL = 200;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, TIMEOUT);

    jest.advanceTimersByTime(TIMEOUT);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, TIMEOUT);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const setIntervalMethod = 'setInterval';

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, setIntervalMethod);

    doStuffByInterval(callback, INTERVAL);
    expect(setInterval).toHaveBeenCalledWith(callback, INTERVAL);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, setIntervalMethod);

    doStuffByInterval(callback, INTERVAL);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(INTERVAL);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(INTERVAL);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  const PATH_FILE = 'test.txt';

  test('should call join with pathToFile', async () => {
    const METHOD = 'join';

    const pathToFile = jest.spyOn(path, METHOD);

    await readFileAsynchronously(PATH_FILE);

    expect(pathToFile).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const METHOD = 'existsSync';

    jest.spyOn(fs, METHOD).mockReturnValue(false);

    const content = await readFileAsynchronously(PATH_FILE);
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const text = 'Hey I am Ihar';
    const METHOD_FS = 'existsSync';
    const METHOD_FSP = 'readFile';

    jest.spyOn(fs, METHOD_FS).mockReturnValue(true);
    jest.spyOn(fsp, METHOD_FSP).mockResolvedValue(text);

    const result = await readFileAsynchronously(PATH_FILE);
    expect(result).toEqual(text);
  });
});
