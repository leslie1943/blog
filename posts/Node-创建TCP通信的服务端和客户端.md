## Node-创建TCP通信的服务端和客户端


### 💛💛 网络层次模型 - OSI 七层模型
1. 应用层: 用户与网络的接口 (`HTTP是常见的协议`)
2. 表示层: 数据加密,转换,压缩
3. 会话层: 控制网络连接的建立和终止
4. 传输层: 控制数据传输的可靠性(port) (`TCP是传输层常见的协议`)
5. 网络层: 确定目标网络
6. 数据链路层: 确定目标主机
7. 物理层: 各种物理设备和标准


### 💛💛 数据封装和解封装
- 应用层 ----------------------> `data`
- 传输层 ----------------------> 目标端口 | 源端口 | `data`
- 网络层 ----------------------> 目标IP | 源IP | 目标端口 | 源端口 | `data` (确定目标处于哪一个网络)
- 数据链路层 -------------------> 目标Mac | 源Mac | 目标IP | 源IP | 目标端口 | 源端口 | `data`
- 物理层 ----------------------> 转换后的二进制数据 1010101010101010101

### 💛💛 三次握手 / 四次挥手
- 要注意的是本来是`四次`握手,只不过服务器端再发送 ACK=1的同时把SYN=1也一起发送了,就变成了`三次`握手
- 为什么是四次挥手呢? 不合并 服务器的响应断开和请求断开呢? <font color="pink">一个服务端回服务于多个客户端, 不能保证某一个客户端将请求发送给服务端之后,服务端能立即将全部的结果数据发送给客户端, 所以要分开处理, 以保证客户端能接收到完整的信息,所以需要四次挥手!</font>

### 💛💛 Net 通信事件 和 方法
- `listening`事件: 调用 `server.listen`方法之后触发
- `connection`事件: 新的连接建立时触发
- `close`事件: 当 `server`关闭时触发
- `error`事件: 当错误出现的时候触发
- `data`事件: 当接收到数据时触发该事件
- `write`事件: 在`socket`上发送数据, 默认是`UTF-8`编码
- `end`操作: 当 `socket`的一端发送 `FIN`包时触发,结束可读端


### 🆔 服务端代码
```js
const net = require('net')

// 创建服务端实例
const server = net.createServer()

const PORT = 1234
const HOST = 'localhost'
server.listen(PORT, HOST)

server.on('listening', () => {
  console.log(`服务端已经开启在 http://${HOST}:${PORT}`)
})

// connection: 新的连接建立时触发
// 接收消息, 回写消息. socket: 双工流
server.on('connection', (socket) => {
  // 当接收到数据时触发该事件:
  // 监听 data 事件: 接收客户端发送的数据
  socket.on('data', (chunk) => {
    const msg = chunk.toString()
    console.info('【S】', msg)

    // 给客户端回数据
    socket.write(Buffer.from('Hello ' + msg))
  })
})

server.on('close', () => {
  console.info('服务端关闭了')
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.info('地址正在被使用')
  } else {
    console.info(err)
  }
})
```

### 🆔 客户端代码
```js
const net = require('net')

// 创建客户端实例
const client = net.createConnection({
  port: 1234,
  host: '127.0.0.1',
})

// 发送消息给服务端
client.on('connect', () => {
  setInterval(() => {
    // 发送数据
    client.write('荣光无限')
  }, 2000)
})

// 获取服务端数据,当成可读流,监听 data 事件, 消费数据
client.on('data', (chunk) => {
  console.info('【C】', chunk.toString())
})

client.on('error', (err) => {
  console.info(err)
})

client.on('close', () => {
  console.info('客户端断开连接')
})
```

- 分别执行 `node server.js` 和 `node client.js`