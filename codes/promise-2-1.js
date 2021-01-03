console.info('start')

setTimeout(() => {
  console.info('in setTimeout')
}, 100)

Promise.resolve().then(() => {
  console.info('resolve')
})
console.info('end')

// print order:
// start, end, resolve, in setTimeout
