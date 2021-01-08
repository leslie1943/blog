Promise.reject('err!!!')
  .then(
    (res) => {
      console.log('success', res)
    },
    (err) => {
      console.log('error', err)
    }
  )
  .catch((err) => {
    console.log('catch', err)
  })

// error err!!!

Promise.reject('error!!!')
  .then((res) => {
    console.log('success', res)
  })
  .catch((err) => {
    console.log('catch', err)
  })

// catch err!!!

Promise.resolve()
  .then(
    function success(res) {
      throw new Error('error!!!')
    },
    function fail1(err) {
      console.log('fail1', err)
    }
  )
  .catch(function fail2(err) {
    console.log('fail2', err)
  })

// fail2 Error: error!!!
