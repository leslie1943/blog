### Promise 3 - 4
- 把 3-3 的 `Promise.resolve()`改成`Promise.reject`
```js
Promise.reject(1)
  .then((res) => {
    // 走不到这个 then
    console.log(res)
    return 2
  })
  .catch((err) => {
    // 执行 catch
    console.log(err)
    return 3 // 返回结果被包裹成 resolve(3)
  })
  .then((res) => {
    // 接受 catch 返回的 resolve(3)
    console.log(res)
  })

// 打印结果: 1, 3

```

### 过程分析
- Promise 可以链式调用, 不过 promise 每次调用 `.then` 或者 `.catch`都会返回一个新的`promise`, 从而实现了链式调用, 并不像一般我们任务的链式调用一样 `return this`
- 上面的输出结果依次打印`1`和`3`, 那是因为`resolve(1)`之后走的第一个`catch`方法,并没有走到`.then`里, 所以第二个`catch`中的`res`实际上是第一个`reject`的返回值
- 且 `return 3`会被包裹成`resolve(3)`