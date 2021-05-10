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
