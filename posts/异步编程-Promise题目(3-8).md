### Promise 3 - 8
- `原则8`: `.then`或者`.catch` 的参数期望是函数, 传入非函数会发生值透传

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

// 输出结果: 1
```

### 过程分析
- 第一个 `then` 和第二个 `then` 中传入的都不是函数, 一个是数字类型, 一个是对象类型, 因此发生了透传, 将`resolve(1)` 的值直接传到最后一个then里.

