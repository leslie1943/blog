const asyncFn = (value, duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(value)
      resolve()
    }, duration)
  })
}

asyncFn('timer1', 1000)
  .then((v1) => {
    console.info('v1')
    asyncFn('timer2', 2000)
  })
  .then((v2) => {
    console.info('v2')
    asyncFn('timer3', 3000)
  })
  .then((v3) => {
    console.info('v3')
  })
  .catch((err) => {
    console.info(err)
  })
