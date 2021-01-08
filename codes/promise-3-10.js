Promise.resolve('1')
  .then((res) => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
    return '我是finally2返回的值' // 不会生效, 依然会返回 Promise.resolve('2')
  })
  .then((res) => {
    console.log('finally2后面的then函数', res)
  })

// 1
// finally2
// finally
// finally2后面的then函数 2
