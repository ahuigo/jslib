// 防抖动: 不抖动才执行
/**
 *
 * @param fn callbak
 * @param wait seconds
 * @returns
 */
export function debounce(fn: <T, M>(arg: T) => M, wait: number = 1) {
  let timeout: any = null;
  return function () {
    const args = arguments;
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn.bind(null, ...args), wait);
  };
}
    // 滚动事件
    //window.addEventListener('scroll', debounce(handle, 1000));


/**
 *
 * @param f callback
 * @param wait milliseconds
 * @param abortValue if has abortValue, promise will reject it if
 * @returns Promise
 */
export function debouncePromise<T extends (...args: any[]) => any>(
    f: T, 
    wait: number, 
    abortValue: any = 'Aborted'
) {
  let cancel = () => { };
  const wrapF = (...args: Parameters<T>): Promise<ReturnType<T>> => {
    cancel();
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => resolve(f(...args)),
        wait,
      );
      cancel = () => {
        clearTimeout(timer);
        if (abortValue) {
          reject(abortValue);
        }
      };
    });
  };
  return wrapF;
}

/*
// deno run src/utils/perf.ts
function add(a: number) {
  return Promise.resolve(a + 1);
}
const wrapFn = debouncePromise(add, 500, 'Aborted');
wrapFn(2).then(console.log).catch(console.log); // Aborted
wrapFn(3).then(console.log).catch(console.log); // 4
*/


// 节流: 排除限速(执行时长间隔)
function throttle(func, wait) {
    var previous = 0;
    return function () {
        var now = Date.now();
        var context = this;
        var args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
