/**
 * Runs promises from array of functions that can return promises
 * in chained manner
 * 
 * const arr = [1, 2, 3]
 * let res = arr.reduce((acc, cur) => (acc += cur), 0)
 * console.info('res', res)

 *
 * @param {array} arr - promise arr
 * @return {Object} promise object
 */
function runPromiseInSequence(arr, input) {
  return arr.reduce((promiseChain, currentFunction) => {
    console.info('promiseChain', promiseChain)
    // console.info('currentFunction', currentFunction)
    return promiseChain.then(currentFunction)
  }, Promise.resolve(input))
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5)
  })
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2)
  })
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
  return a * 3
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4)
  })
}

const promiseArr = [p1, p2, f3, p4]
runPromiseInSequence(promiseArr, 10).then(console.log) // 1200
