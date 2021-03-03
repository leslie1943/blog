## Node-模拟文件可读流的模拟实现

```js
// >>>>>> 模拟文件可读流 <<<<<< //
// >>>>>> 模拟文件可读流 <<<<<< //
// >>>>>> 模拟文件可读流 <<<<<< //

const fs = require('fs')
const EventEmitter = require('events')

class MyFileReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'r'
    this.mode = options.mode || 438
    this.autoCLose = options.autoCLose || true
    this.start = options.start || 0
    this.end = options.end
    this.highWaterMark = options.highWaterMark || 64 * 1024 // 64kb
    this.readOffset = 0

    // 生成实例的时候 open 就会被执行
    this.open()

    // 只要当前对象监听了事件的时候会被触发, 无论是什么事件 rs.on('xxxx')
    this.on('newListener', (type) => {
      if (type === 'data') {
        this.read()
      }
    })
  }

  /**
   * open 方法里的 this 是具体的实例
   * 所以在 emit 事件的时候, 外部对应的实例可以 监听到
   */
  open() {
    // 🥇🥇 原生 open 方法来打开指定位置的文件
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (!err) {
        this.fd = fd // 动态添加的属性
        // 🌼🌼 主动 发布事件 open 🌼🌼
        this.emit('open', fd)
      } else {
        // 🌼🌼 主动 发布事件 error 🌼🌼
        this.emit('error', err)
      }
    })
  }

  // this.read 必须等到 open 执行结束后再执行
  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read)
    }
    // console.info(this.fd)
    let buf = Buffer.alloc(this.highWaterMark)

    // 计算读取的个数
    let howMuchToRead = this.end ? Math.min(this.end - this.readOffset + 1, this.highWaterMark) : this.highWaterMark

    fs.read(this.fd, buf, 0, howMuchToRead, this.readOffset, (err, readBytes) => {
      if (readBytes) {
        this.readOffset += readBytes
        // 将每次读取到的数据 发送 出去
        this.emit('data', buf.slice(0, readBytes))
        // 继续读取数据
        this.read()
      } else {
        // 🌼🌼  发布事件 end 🌼🌼
        this.emit('end')
        this.close()
      }
    })
  }

  close() {
    fs.close(this.fd, () => {
      // 🌼🌼  发布事件 close 🌼🌼
      this.emit('close')
    })
  }
}

let rs = new MyFileReadStream('test.txt', { highWaterMark: 3, end: 7 })

// 🌼🌼 订阅事件 open 🌼🌼
rs.on('open', (fd) => {
  console.info('open', fd)
})

// 🌼🌼 订阅事件 error 🌼🌼
rs.on('error', (err) => {
  console.info(err)
})

// 🌼🌼 订阅事件 data 🌼🌼
rs.on('data', (chunk) => {
  console.info(chunk.toString())
})

rs.on('end', () => {
  console.info('end')
})

rs.on('close', () => {
  console.info('close')
})

```