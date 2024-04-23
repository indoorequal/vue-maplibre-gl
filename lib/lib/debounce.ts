export function debounce(fn: Function, wait = 250, immediate = false) {
  let timeout: number | undefined;

  // @ts-expect-error TS7019: Rest parameter 'args' implicitly has an 'any[]' type.
  function debounced(...args) {
    const later = () => {
      timeout = undefined;
      if (immediate !== true) {
        // @ts-expect-error TS7019: Rest parameter 'args' implicitly has an 'any[]' type.
	fn.apply(this, args);
      }
    };

    clearTimeout(timeout!);
    if (immediate === true && timeout === undefined) {
      // @ts-expect-error TS7019: Rest parameter 'args' implicitly has an 'any[]' type.
      fn.apply(this, args);
    }
    timeout = window.setTimeout(later, wait);
  }

  debounced.cancel = () => {
    clearTimeout(timeout!);
  };

  return debounced;
}
