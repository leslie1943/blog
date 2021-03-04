## 

### 模拟 外部服务端
- 和浏览器存在跨域的服务器
```js
// 模拟 外部 服务端

const http = require('http')

const server = http.createServer((req, res) => {
  // 获取请求体的内容
  let arr = []
  req.on('data', (chunk) => {
    arr.push(chunk)
  })
  req.on('end', () => {
    console.info(Buffer.concat(arr).toString())
    res.end('外部Server修改后的内容:荣光无限-Updated')
  })
})

server.listen(1234, () => {
  console.info('external server is running')
})
```

### 模拟 代理客户端
 * 既是一个客户端: 要访问外部server
 * 又是一个服务端: 接收浏览器的访问
```js
/**
 * 既是一个客户端: 要访问外部server
 * 又是一个服务端: 接收浏览器的访问
 */
const http = require('http')

const options = {
  host: 'localhost',
  port: 1234,
  path: '/',
  method: 'POST',
}

// 在代理客户端创建一个server
const server = http.createServer((request, response) => {
  // req 表示一个请求
  let req = http.request(options, (res) => {
    // res 是服务端返回的数据
    let arr = []

    res.on('data', (data) => {
      arr.push(data)
    })

    res.on('end', () => {
      let ret = Buffer.concat(arr).toString()
      console.info('>>> Local_Server >>>', ret) // 查看服务端返回的数据
      response.setHeader('Content-type', 'text/html;charset=utf-8')
      response.end(ret) // 回写给访问浏览器
    })
  })

  // 请求开始发送数据
  req.end('本地Server发送的内容:荣光无限-Original') // 这里应该就是动态的内容,由浏览器传递
})

server.listen(2345, () => {
  console.info('local server is running')
})

```