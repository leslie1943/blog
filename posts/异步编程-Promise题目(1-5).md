### Promise 题目 1 - 5

```js
const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
fn().then((res) => {
  console.log(res);
});
console.log("start");

```
### 过程分析

- 这道题里最先执行的是'start'吗 🤔️ ?
- 请仔细看, `fn`函数它是直接返回了一个 `new Promise` 的 , 而且 `fn` 函数的调用是在 `start`之前, 所以它里面的内容应该会先执行.
- 结果: `1 start success`