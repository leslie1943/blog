const first = () =>
  new Promise((resolve, reject) => {
    console.log(3)

    let p = new Promise((resolve, reject) => {
      console.log(7)

      setTimeout(() => {
        console.log(5)
        resolve(6) // 状态不再发生变化
        console.log(p)
      }, 0)

      resolve(1) // p 的状态在这里被lock了
    })

    resolve(2)

    p.then((arg) => {
      console.log(arg)
    })
  })

first().then((arg) => {
  console.log(arg)
})

console.log(4)

/**
 * 3
 * 7
 * 4
 * 1
 * 2
 * 5
 * Promise:1
 *
 */
