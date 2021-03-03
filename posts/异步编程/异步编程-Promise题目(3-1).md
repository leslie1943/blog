### Promise 3 - 1
- `Promise` 的 状态一经改变就不能再改变, 但是其内部的代码逻辑依旧会执行, 比如下面的`console.info('try to run')`代码依然会被执行

```js
const promise = new Promise((resolve, reject) => {
    resolve('success1')
    reject('error')  // 不会执行
    resolve('success2') // 不会执行
    console.info('try to run') // 会执行
})

promise.then(res => {
    console.info('then:', res) // then:success1
}).catch(err => {
    console.info('catch:', err)
})
```