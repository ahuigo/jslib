//作者：叶子依然 链接：https://www.zhihu.com/question/358075914/answer/915814865
const queue = {
  a() {
    setTimeout(() => {
      console.log("a is done");
      this.next();
    }, 1000);
  },
  b() {
    setTimeout(() => {
      console.log("b is done");
      this.next();
    }, 1000);
  },
  c() {
    setTimeout(() => {
      console.log("c is done");
    }, 1000);
  }
};

Object.defineProperty(queue, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value() {
    const o = this;
    const ks = Object.keys(o);
    let idx = 0;
    return {
      next() {
        const key = ks[idx++];
        const func = o[key];
        if (typeof func === "function") {
          func.call(this);
        }
        return {
          value: key,
          done: idx > ks.length
        };
      }
    };
  }
});

const qt = queue[Symbol.iterator]();
qt.next();
