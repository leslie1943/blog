### Promise 3 - 7
```js
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)
```

### 过程分析
- `.then` 或 `.catch` 返回的值不能是 `promise` 本身, 否则会造成死循环.
因此结果会报错：
```bash
# Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
```

