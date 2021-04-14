### JavaScript: 优雅处理async-await, 避免每次try-catch
- 在开发中, 你是否会为了系统健壮性, 亦或者是为了捕获异步的错误, 而频繁的在 `async` 函数中写 `try/catch` 的逻辑?
```js
/**
 *
 * @param {*} asyncCallback 待执行的异步函数
 * @returns [null, res] 或者 [err, null]
 */
async function errorCaptured(asyncCallback, params) {
  try {
    let res = await asyncCallback(params)
    return [null, res]
  } catch (err) {
    return [err, null]
  }
}

// 真正的异步函数
function makeItem({ counter }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ index: counter + 100, id: Math.random(), isGood: true })
      } else {
        reject({ index: counter + 100, id: Math.random(), isGood: false })
      }
    }, 1000)
  })
}

// 入口文件: 这里调用使用封装的错误处理函数 处理真正的异步函数
async function mainFn() {
  let params = { counter: 1 }
  let [err, res] = await errorCaptured(makeItem, params)
  if (err) {
    console.info('err', err)
  } else {
    console.info('res', res)
  }
}
mainFn()
```

- 这样封装之后的两个问题:
1. 参数传递, 需要执行异步调用的函数显示的解析参数
2. 每次还要先定义出来被执行的异步函数