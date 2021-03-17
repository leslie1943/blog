const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
  console.info('try to run')
})

promise
  .then((res) => {
    console.info('then:', res) // then:success1
  })
  .catch((err) => {
    console.info('catch:', err)
  })
