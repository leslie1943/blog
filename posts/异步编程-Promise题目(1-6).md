### Promise 题目 1 - 6

- 如果把fn的调用放到start之后呢?

```js
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
console.log("start");
fn().then(res => {
  console.log(res);
});
// start, 1, success
```

### 过程分析
- 是的, 现在 `start` 就在 `1` 之前打印出来了,因为 `fn` 函数是之后执行的.
- 注意⚠️: 之前我们很容易就以为看到 `new Promise()` 就执行它的第一个参数函数了, 其实这是不对的, 就像这两道题中, 我们得注意它是不是被包裹在函数当中, 如果是的话, 只有在函数调用的时候才会执行.
