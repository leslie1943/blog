## Node: 使用fs模块完成文件的COPY
```js
const fs = require('fs')

/**
 * 1: 打开 a 文件, 利用 read 将数据保存到 buffer 暂存起来
 * 2: 打开 c 文件, 利用 write 将 buffer 中数据写入到 b 文件中
 */

let buf = Buffer.alloc(10)
const BUFFER_SIZE = buf.length
let readOffset = 0

fs.open('a.txt', 'r', (err, rfd) => {
  // a+: 追加的方式
  fs.open('c.txt', 'a+', (err, wfd) => {
    next(rfd, wfd) // 首次调用
  })
})

// 提取方法: 接受读取的文件和写入的文件
function next(rfd, wfd) {
  fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes) => {
    if (!readBytes) {
      // 没有读取内容,内容读取完毕
      fs.close(rfd, () => {})
      fs.close(wfd, () => {})
      console.info('拷贝完成!')
      return
    }
    console.info('readBytes',readBytes)
    // 下次开始读取的位置
    readOffset += readBytes
    fs.write(wfd, buf, 0, readBytes, (err, written) => {
        
      next(rfd, wfd) // 继续读取
    })
  })
}

```