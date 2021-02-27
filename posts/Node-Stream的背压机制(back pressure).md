## Node: Stream的背压机制(back pressure)
- 背压问题来源于生产者消费者模式中,消费者处理速度过慢。
```bash
 # 比如说, 我们下载过程, 处理速度为3Mb/s, 而压缩过程, 处理速度为1Mb/s, 这样的话, 很快缓冲区队列就会形成堆积.
```
- 背压处理可以理解为一个向上`喊话通知`的过程,喊话的目的是让`生产者`停止`rs.pause()`数据的发送.
- 等到缓存区处理至`空`的时候, 再通知`生产者`恢复`rs.resume()`发送数据
- 这样就能够实现, 整个流的处理始终以保持以消费者速度进行消耗, 不会引起重大积压

### 运行机制代码
```js
const fs = require('fs')

// 生成数据的可读流
let rs = fs.createReadStream('test.txt', {
  highWaterMark: 4,
})

// 消费数据的可写流
let ws = fs.createWriteStream('pipe.txt', {
  highWaterMark: 1,
})

let flag = true
rs.on('data', (chunk) => {
  flag = ws.write(chunk, () => {
    console.info('write done')
  })
  // 缓存区满了,先别生产数据了
  if (!flag) {
    rs.pause()
  }
})

// 缓存区有空间接纳新数据,执行 drain 事件
ws.on('drain', () => {
  rs.resume()
})
```