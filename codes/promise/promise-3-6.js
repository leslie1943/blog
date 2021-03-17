Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.info('then:', res)
  })
  .catch((err) => {
    console.info('catch:', err)
  })

//  then:error
