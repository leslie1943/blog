### Promise 4 - 3
- 使用.race()方法, 它只会获取最先执行完成的那个结果, 其它的异步任务虽然也会继续进行下去, 不过race已经不管那些任务的结果了.

```js
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log('result: ', res))
  .catch(err => console.log(err))
// 1
// 'result: ' 1
// 2
// 3
```
- 这个race有什么用呢?使用场景还是很多的, 比如我们可以用 `race` 给某个异步请求设置超时时间, 并且在超时后执行相应的操作


