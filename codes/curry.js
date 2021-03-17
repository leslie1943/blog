let fn = (x, y) => x + y

const curry = function (fn) {
  return function (x) {
    return function (y) {
      return fn(x, y)
    }
  }
}

let myFn = curry(fn)
console.info(myFn(1)(2))
