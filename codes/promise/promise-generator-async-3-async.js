const asyncFn = (value, duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(value)
      resolve()
    }, duration)
  })
}

const fn = async () => {
  console.info('v1')
  await asyncFn('timer1', 1000)
  console.info('v2')
  await asyncFn('timer2', 2000)
  console.info('v3')
  await asyncFn('timer3', 3000)
}

fn()
