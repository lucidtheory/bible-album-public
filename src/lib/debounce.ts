/*
  Generic Debounce function. Delays a function call by a given number of milliseconds.
  Will immediately call and then wait by the delayed amount before the function
  can be called again.

  This should be used any time we are submitting something to an API or calling a
  function that we don't want a user to accidentally submit multiple times.
*/
function debounce(fn: any, wait: number) {
  let callable = true;

  return function executedFunction(...args: any) {
    if (callable) {
      callable = false;
      setTimeout(() => {
        callable = true;
      }, wait);
      fn(...args);
    }
  };
}

export default debounce;
