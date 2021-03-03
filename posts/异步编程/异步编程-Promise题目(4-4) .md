### Promise 4 - 4
```js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  )
  return p
}
Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then((res) => console.log('result: ', res))
  .catch((err) => console.log(err))

/**
 * 0
 * Error: 0
 * 1
 * 2
 * 3
 */
```

### all 和 race 的总结
1. `Promise.all()`的作用是接收一组异步任务, 然后并行执行异步任务, 并且在所有异步操作执行完后才执行回调.
2. `.race()`的作用也是接收一组异步任务, 然后并行执行异步任务, 只保留取第一个执行完成的异步操作的结果, 其他的方法仍在执行, 不过执行结果会被抛弃.
3. `Promise.all().then()`结果中数组的顺序和`Promise.all()`接收到的数组顺序一致.
4. `all`和`race`传入的数组中如果有会抛出异常的异步任务, 那么只有最先抛出的错误会被捕获, 并且是被`then`的第二个参数或者后面的`catch`捕获；但并不会影响数组中其它的异步任务的执行.
