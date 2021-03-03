## Node: TCP通信粘包问题的解决

### 💛💛 TCP 粘包及解决
- 发送端累积数据统一发送
- 接收端缓冲数据之后再消费
- TCP 拥塞机制决定发送时机


###  💛💛 封包拆包实现
- 一条完整的消息有三部分组成: 🅿`消息头[header](序列号)` + 🅿`消息头[header](消息长度)` +🅿 `消息体[body]`
- 数据传输过程
- 1. 进行数据编码,获取二进制数据包
- 2. 按规则拆解数据, 获取指定长度的数据
- `Buffer` 数据读写
- 1. `writenInt16BE`: 将 value 从指定位置 写入
- 2. `readInt16BE`: 从指定位置开始 读取 数据

### 💛💛 转换类
```js
class MyTransform {
  constructor() {
    this.packageHeaderLen = 4 // header 总长度
    this.serialNum = 0
    this.serialLen = 2
  }

  // 编码
  encode(data, serialNum) {
    const body = Buffer.from(data) // 把数据变成二进制的数据

    // 1-按照指定的长度申请一片内存空间作为 header 来使用
    const headerBuf = Buffer.alloc(this.packageHeaderLen)

    // 2-组装header
    headerBuf.writeInt16BE(serialNum || this.serialNum) // 序列号
    headerBuf.writeInt16BE(body.length, this.serialLen) // Body 长度

    if (serialNum === undefined) {
      this.serialNum++
    }

    return Buffer.concat([headerBuf, body])
  }

  // 解码
  decode(buffer) {
    const headerBuf = buffer.slice(0, this.packageHeaderLen)
    const bodyBuf = buffer.slice(this.packageHeaderLen)

    return {
      serialNum: headerBuf.readInt16BE(),
      bodyLength: headerBuf.readInt16BE(this.serialLen),
      body: bodyBuf.toString(),
    }
  }

  // 获取包长度的方法
  getPackageLen(buffer) {
    if (buffer.length < this.packageHeaderLen) {
      return 0
    } else {
      return this.packageHeaderLen + buffer.readInt16BE(this.serialLen)
    }
  }
}
module.exports = MyTransform

```

### 💛💛 拆包服务端
```js
const net = require('net')
const MyTransform = require('./transform-my')

const server = net.createServer()

let overageBuffer = null
let ts = new MyTransform()

server.listen(1234, 'localhost')

server.on('listening', () => {
  console.info(`服务已经启动 http://localhost:1234`)
})

// 监听连接
server.on('connection', (socket) => {
  socket.on('data', (chunk) => {
    if (overageBuffer) {
      chunk = Buffer.concat([overageBuffer, chunk])
    }

    let packageLen = 0
    while ((packageLen = ts.getPackageLen(chunk))) {
      const packageContent = chunk.slice(0, packageLen)
      chunk = chunk.slice(packageLen)

      const ret = ts.decode(packageContent)
      console.info(ret)
      socket.write(ts.encode(ret.body, ret.serialNum))
    }
    overageBuffer = chunk
  })
})
```

### 💛💛 拆包客户端
```js
const net = require('net')
const MyTransform = require('./transform-my')

let overageBuffer = null
let ts = new MyTransform()

const client = net.createConnection({
  host: 'localhost',
  port: 1234,
})

client.write(ts.encode('荣光无限-1'))
client.write(ts.encode('荣光无限-2'))
client.write(ts.encode('荣光无限-3'))
client.write(ts.encode('荣光无限-4'))
client.write(ts.encode('荣光无限-5'))

client.on('data', (chunk) => {
  if (overageBuffer) {
    chunk = Buffer.concat([overageBuffer, chunk])
  }

  let packageLen = 0
  while ((packageLen = ts.getPackageLen(chunk))) {
    const packageContent = chunk.slice(0, packageLen)
    chunk = chunk.slice(packageLen)

    const ret = ts.decode(packageContent)
    console.info(ret)
  }
  overageBuffer = chunk
})

```
