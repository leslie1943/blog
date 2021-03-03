## Node: 代理客户端的实现

### 💛💛 代理客户端解决跨域的步骤

- 实现一个 http 客户端, 由它向某一个服务端发送请求, 当我们的请求出现跨域情况的时候可以采用这种方式解决.
- 解决过程:
1. 就是让浏览器客户端直接请求我们创建的【 🚀 代理客户端 】发送请求,
2. 这个【 🚀 代理客户端 】又充当了浏览器直接访问的的服务端
3. 再让【 🚀 代理客户端 】再往另外一个《 🚗Web服务端 》发送请求, 这个《 🚗Web服务端 》有可能是一个出现跨域的 web 服务端
4. 服务端之间去发送请求不存在跨域的现象, 《 🚗Web服务端 》处理完请求后把结果返回给我们自己创建的 【 🚀 代理客户端 】
5. 再由【 🚀 代理客户端 】把数据处理后发送给浏览器
6. 整个流程下来就可以完成浏览器访问跨域资源的过程

### 💛💛 代理服务器-实现
```js
const http = require('http')
const url = require('url')
const querystring = require('querystring') // 处理表单的内置模块

const server = http.createServer((req, res) => {
  //   console.info('Request has been arrived!')
  let { pathname, query } = url.parse(req.url)
  console.info('pathname', pathname)
  console.info('query', query)

  // 获取请求体的内容
  let arr = []
  req.on('data', (chunk) => {
    arr.push(chunk)
  })

  req.on('end', () => {
    let objStr = Buffer.concat(arr).toString() // 获取可查看的数据
    const contentType = req.headers['content-type'] // 获取内容类型

    if (contentType === 'application/json') {
      // >>> JSON 格式的处理
      let objReal = JSON.parse(objStr)
      objReal.add = 'Leslie' // 服务端添加的属性
      console.info(objReal)
      res.end(JSON.stringify(objReal))
    } else if (contentType === 'application/x-www-form-urlencoded') {
      // >>> FORM 格式的处理
      let ret = querystring.parse(objStr)
      res.end(JSON.stringify(ret))
    }
  })
})

server.listen(1234, () => {
  console.info('server is running')
})
```

### 💛💛 代理客户端-实现
```js
// 代理客户端

const http = require('http')

const get_config = {
  host: 'localhost',
  port: 1234,
  path: '/?a=1',
}

const post_config = {
  host: 'localhost',
  port: 1234,
  path: '/?a=1',
  method: 'POST', // post
  headers: {
    // 'Content-type': 'application/json', // 测试 json 格式数据
    'Content-type': 'application/x-www-form-urlencoded', // form 表单 格式数据
  },
}

http.get(get_config, (res) => {})

// 不能直接发送 post 请求
let req = http.request(post_config, (res) => {
  let arr = []
  res.on('data', (data) => {
    arr.push(data)
  })

  res.on('end', () => {
    console.info(Buffer.concat(arr).toString())
  })
})

// 发送数据
// req.end('荣光无限')

// 发送数据
// req.end('{"name":"suzhen","age":"20"}') // 测试 json 格式数据

// 发送数据
req.end('a=1&b=2')

```
