async function async1() {
  console.log('async1 start')
  // 原来代码
  // await async2();
  // console.log("async1 end");

  // 转换后代码
  new Promise((resolve) => {
    console.log('async2')
  }).then((res) => console.log('async1 end'))
}

async1()
console.log('start')

// async1 start
// async2
// start
// async1 end
