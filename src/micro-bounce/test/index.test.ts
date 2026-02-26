/// <reference types="jest" />
import { microBounce } from '../index.js';

/* restore mocks after each test */
afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('microBounce', () => {
  /* #1 */
  test('throws when delay is negative', () => {
    expect(() => microBounce(() => {}, -1)).toThrow(
      '[Bad]: Micro-Bounce: Delay To be Greater Than Or Equal To Zero!',
    );
  });

  /* #2 */
  test('throws when delay is not finite', () => {
    expect(() => microBounce(() => {}, Number.NaN)).toThrow(
      '[Bad]: Micro-Bounce: Delay To be Greater Than Or Equal To Zero!',
    );
  });

  /* #3 */
  test('calls function after delay', () => {
    jest.useFakeTimers();
    const spy = jest.fn();
    const run = microBounce(spy, 100);

    run('hello');
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('hello');
  });

  /* #4 */
  test('debounces rapid calls and uses latest arguments', () => {
    jest.useFakeTimers();
    const spy = jest.fn();
    const run = microBounce(spy, 100);

    run('first');
    jest.advanceTimersByTime(50);
    run('second');
    jest.advanceTimersByTime(99);
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('second');
  });

  /* #5 */
  test('preserves this context', () => {
    jest.useFakeTimers();
    const resultSpy = jest.fn();

    function handler(this: { value: number }, bonus: number): void {
      resultSpy(this.value + bonus);
    }

    const run = microBounce(handler, 10);
    run.call({ value: 7 }, 5);

    jest.advanceTimersByTime(10);
    expect(resultSpy).toHaveBeenCalledWith(12);
  });

  /* #6 */
  test('works with zero delay', () => {
    jest.useFakeTimers();
    const spy = jest.fn();
    const run = microBounce(spy, 0);

    run();
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(0);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  /* #7 */
  test('throws when delay is Infinity', () => {
    expect(() => microBounce(() => {}, Number.POSITIVE_INFINITY)).toThrow(
      '[Bad]: Micro-Bounce: Delay To be Greater Than Or Equal To Zero!',
    );
  });

  /* #8 */
  test('separate instances do not share debounce state', () => {
    jest.useFakeTimers();
    const firstSpy = jest.fn();
    const secondSpy = jest.fn();

    const firstRun = microBounce(firstSpy, 100);
    const secondRun = microBounce(secondSpy, 100);

    firstRun('a1');
    secondRun('b1');
    jest.advanceTimersByTime(50);
    firstRun('a2');

    jest.advanceTimersByTime(50);
    expect(secondSpy).toHaveBeenCalledTimes(1);
    expect(secondSpy).toHaveBeenCalledWith('b1');
    expect(firstSpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(firstSpy).toHaveBeenCalledTimes(1);
    expect(firstSpy).toHaveBeenCalledWith('a2');
  });
});
