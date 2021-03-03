### Promise 3 - 2
- `.catch`不管被连接到哪里, 都能捕获上层未捕获过的错误

```js
const promise1 = new Promise((resolve, reject) => {
  reject('error')
  resolve('success2')
})
promise1
  .then((res) => {
    console.log('then1: ', res)
  })
  .then((res) => {
    console.log('then2: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
    // return 'result from catch'
  })
  .then((res) => {
    console.log('then3: ', res)
  })

  /**
 * 首先输出 catch: error
 * 然后 catch 会返回一个 promise, 继续执行.then方法
 * 输出 then3: undefined
 */
```
- 至于`then3`也会被执行, 那是因为`catch()`也会返回一个`Promise`, 且由于这个`Promise`没有返回值, 所以打印出来的是 `undefined`


- 在`Promise`中, 返回任意一个非`promise`的值都会被包裹成`promise`对象, 例如
```js
const promise2 = new Promise((resolve, reject) => {
  reject('error')
  resolve('success2')
})
promise2
  .then((res) => {
    console.log('then1: ', res)
  })
  .then((res) => {
    console.log('then2: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
    return 'result from catch'
  })
  .then((res) => {
    console.log('then3: ', res)
  })
/**
 * 首先输出 catch: error
 * 然后 catch 会返回一个 promise, 'result from catch'会被 Promise.resolve() 包裹  继续执行.then方法
 * 输出 then3: result from catch
 */
```