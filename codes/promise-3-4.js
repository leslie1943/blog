Promise.reject(1)
  .then((res) => {
    // 走不到这个 then
    console.log(res)
    return 2
  })
  .catch((err) => {
    // 执行 catch
    console.log(err)
    return 3 // 返回结果被包裹成 resolve(3)
  })
  .then((res) => {
    // 接受 catch 返回的 resolve(3)
    console.log(res)
  })

// 打印结果: 1, 3
