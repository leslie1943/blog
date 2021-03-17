// 函数接收一个函数作为参数
function doEach(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i])
  }
}

let arr = [0, 1, 2, 3, 4]
doEach(arr, (item) => {
  console.info('---->' + item + '<----')
})

const once = (fn) => {
  let done = false
  return function () {
    if (!done) {
      fn.apply(this, fn)
    } else {
      console.info('this fn has been performed')
    }
    done = true
  }
}

let pay = once(() => {
  console.info('Paid')
})
pay()
pay()
pay()
