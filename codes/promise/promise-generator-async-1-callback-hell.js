// 回调地狱
const t1 = () =>
  setTimeout(() => {
    console.info('timer 1')
    setTimeout(() => {
      console.info('timer 2')
      setTimeout(() => {
        console.info('timer 3')
      }, 3000)
    }, 2000)
  }, 1000)

t1()
