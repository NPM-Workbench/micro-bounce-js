/* app imports */
import type { TAnyFunc } from "../types/index.js";

/* module */
function microBounce<T extends TAnyFunc>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  if (!Number.isFinite(delay) || delay < 0) {
    throw new Error("[Bad]: Micro-Bounce: Delay To be Greater Than Or Equal To Zero!");
  } else {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
      /* clear if need be */
      if (timeout !== undefined) {
        clearTimeout(timeout);
      }

      /* call the function after the specified delay */
      timeout = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  }
}

/* exports */
export { microBounce };
