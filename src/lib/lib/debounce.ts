export function debounce(fn: Function, wait = 250, immediate = false) {
  let timeout: number | undefined;

  function debounced(/* ...args */) {
    const args = arguments;

    const later = () => {
      timeout = undefined;
      if (immediate !== true) {
	// @ts-ignore
	fn.apply(this, args);
      }
    };

    clearTimeout(timeout!);
    if (immediate === true && timeout === undefined) {
      // @ts-ignore
      fn.apply(this, args);
    }
    timeout = window.setTimeout(later, wait);
  }

  debounced.cancel = () => {
    clearTimeout(timeout!);
  };

  return debounced;
}
