async function async1() {
  console.log('async1 start')
  await new Promise((resolve) => {
    console.log('promise1')
    resolve('value in async1 await') // 这一行的结果没有被接收
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
 * async1 success
 * async1 end
 */
