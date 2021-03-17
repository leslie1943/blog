async function async1() {
  console.log('async1 start')
  // 如果不加 return async1().then()不会有结果
  return new Promise((resolve) => {
    console.info('promise')
    resolve('resolved value')
  })
  console.log('async1 end')
}
async1().then((res) => {
  console.info(res)
})
console.log('start')

// async1 start
// promise
// async1 end
// start
// resolved value
