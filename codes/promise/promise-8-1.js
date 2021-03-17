const arrPromises = [1, 2, 3]

// 第一个参数是初始值
arrPromises.reduce((acc, cur) => {
  return acc.then(() => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(console.log(cur)), 1000)
    })
  })
}, Promise.resolve())

/**
 * 利用reduce, 初始值传入一个Promise.resolve(), 之后往里面不停的叠加.then()
 */

// const arr = [1, 2, 3, 4]
// const total = arr.reduce((acc, cur) => {
//   return acc + cur
// }, 0)
// console.info(total)
