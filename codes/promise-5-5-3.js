async function async1() {
  console.log('async1 start')
  await new Promise((resolve, reject) => {
    console.log('promise1')
    reject('hello') // 在 Promise 内部只有 resolve / reject 会让 Promise 不再 await
    return 'Hello' // return 不会返回值
  })
  console.log('async1 success')
  return 'async1 end' // 直接返回了字符串 .then(res) 中的 res的值
}
console.log('srcipt start')

async1().then((res) => console.log(res))

console.log('srcipt end')

/**
 * srcipt start
 * async1 start
 * promise1
 * srcipt end
 */
