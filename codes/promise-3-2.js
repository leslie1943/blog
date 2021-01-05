const promise1 = new Promise((resolve, reject) => {
  reject('error')
  resolve('success2')
})
promise1
  .then((res) => {
    console.log('then1: ', res)
  })
  .then((res) => {
    console.log('then2: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
    // return 'result from catch'
  })
  .then((res) => {
    console.log('then3: ', res)
  })

/**
 * 首先输出 catch: error
 * 然后 catch 会返回一个 promise, 继续执行.then方法
 * 输出 then3: undefined
 */

const promise2 = new Promise((resolve, reject) => {
  reject('error')
  resolve('success2')
})
promise2
  .then((res) => {
    console.log('then1: ', res)
  })
  .then((res) => {
    console.log('then2: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
    return 'result from catch'
  })
  .then((res) => {
    console.log('then3: ', res)
  })
/**
 * 首先输出 catch: error
 * 然后 catch 会返回一个 promise, 继续执行.then方法
 * 输出 then3: result from catch
 */
