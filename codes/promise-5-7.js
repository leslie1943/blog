async function async1() {
  console.log('async1 start')

  await new Promise((resolve) => {
    console.log('promise1')
    resolve('promise resolve')
  })

  console.log('async1 success')
  return 'async1 end'
}

console.log('srcipt start')

async1().then((res) => {
  console.log(res)
})

new Promise((resolve) => {
  console.log('promise2')
  setTimeout(() => {
    console.log('timer')
  })
})

/**
 * srcipt start
 * async1 start
 * promise1
 * promise2
 * async1 success
 * async1 end
 * timer
 */
