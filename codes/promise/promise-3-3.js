Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2 // 被包裹成 resolve(2)返回
  })
  .catch((err) => {
    // 走不到这里
    return 3
  })
  .then((res) => {
    console.log(res) // 第一个 then 的返回值
  })
// 打印结果: 1 2
