function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000 * x))
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
  .catch((err) => console.log('catch: ', err)) // 执行这里

/**
 * 0
 * Error: 0
 * 1  ===> 会执行, 但不会进入 then/catch
 * 2  ===> 会执行, 但不会进入 then/catch
 * 3  ===> 会执行, 但不会进入 then/catch
 */

Promise.race([runAsync(0), runAsync(1), runReject(2), runAsync(3)])
  .then((res) => console.log('result: ', res))
  .catch((err) => console.log('catch: ', err))
// 0
// result: 0
// 1 ===> 会执行, 但不会进入 then/catch
// 2 ===> 会执行, 但不会进入 then/catch
// 3 ===> 会执行, 但不会进入 then/catch
