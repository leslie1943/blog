## Node: fs.createReadStream文件读取流操作步骤
```js
// 💛💛💛 STEP-0: 引入模块
const fs = require('fs')

// 💛💛💛 STEP-1: 读取文件
let rs = fs.createReadStream('./test.txt', {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 438,
  autoClose: true,
  start: 0,
  //   end: 3,
  highWaterMark: 4, // 每次最多读取的长度
})

// 💛💛💛 STEP-2: 文件打开

rs.on('open', (fd) => {
  console.info('文件被打开了', fd) // 3
})

// 💛💛💛 STEP-3: 数据存储
let bufferArr = []
rs.on('data', (chunk) => {
    // 使用数组保存所有读取的数据,保证数据的连续性
  bufferArr.push(chunk)
})

// 💛💛💛 STEP-4: 数据被清空之后
rs.on('end', () => {
  console.info(Buffer.concat(bufferArr).toString())
  console.info('数据读取完毕!')
})

// 💛💛💛 STEP-5: 文件关闭
rs.on('close', () => {
  console.info('文件被关闭了') 
})


rs.on('error', (err) => {
  console.info('出错了!', err)
})
```