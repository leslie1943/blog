### Promise 3 - 3

```js
Promise.resolve(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    return 3;
  })
  .then(res => {
    console.log(res);
  });
// 打印结果: 1 2
```

### 过程分析
- Promise 可以链式调用, 不过 promise 每次调用 `.then` 或者 `.catch`都会返回一个新的`promise`, 从而实现了链式调用, 并不像一般我们任务的链式调用一样 `return this`
- 上面的输出结果依次打印`1`和`2`, 那是因为`resolve(1)`之后走的第一个`then`方法,并没有走到`.catch`里, 所以第二个`then`中的`res`实际上是第一个`then`的返回值
- 且 `return 2`会被包裹成`resolve(2)`。