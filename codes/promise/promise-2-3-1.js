setTimeout(() => {
  console.log('timer1')

  setTimeout(() => {
    console.log('timer3')
  }, 0)
}, 0)
setTimeout(() => {
  console.log('timer2')
}, 0)

console.log('start')

// start, timer1,timer2,timer3
