### Promise 3 - 9
- 介绍一下.then函数中的两个参数。
- 第一个参数是用来处理`Promise`成功的函数, 第二个则是处理失败的函数
- 也就是说 `Promise.resolve(1)`的值会进入成功的函数, `Promise.reject(2)`的值会进入失败的函数

```js
Promise.reject('err!!!')
  .then((res) => {
    console.log('success', res)
  }, (err) => {
    console.log('error', err)
  }).catch(err => {
    console.log('catch', err)
  })
// 输出结果:
// error err!!!
```
- 它进入的是`then()`中的第二个参数里面, 如果把第二个参数去掉,就会进入`catch`中

```js
Promise.reject('error!!!')
  .then((res) => {
    console.log('success', res)
  }).catch(err => {
    console.log('catch', err)
  })

  // 输出结果:
// catch err!!!
```

- 再来
```js
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
```
- 由于 `Promise` 调用的是 `resolve()`, 因此`.then()`执行的应该是`success()`函数, 可是`success()`函数抛出的是一个错误, 它会被后面的`catch()`给捕获到, 而不是被`fail1`函数捕获.

