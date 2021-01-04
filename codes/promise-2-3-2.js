setTimeout(() => {
  console.log('timer1')

  Promise.resolve().then(() => {
    console.log('promise')
  })
}, 0)

setTimeout(() => {
  console.log('timer2')
}, 0)

console.log('start')

// start, timer1,promise,timer2
