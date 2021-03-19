### 为了配置多个环境的不同配置
- `yarn add webpack-merge` 安装 `merge` 专门合并webpack配置的


###  Webpack 一些配置属性的理解说明

#### devServer - contentBase
```js
  'devServer': {
    /** 💛 contentBase: 为开发服务器指定查找资源目录
     * 如果页面中使用了 该属性配置中资源,项目启动后
     * 可以使用 http://locahost:8080/favicon.ico 查看是否可以访问到相关的资源
     */
    'contentBase': ['./public']
  },
```
#### devServer - proxy
```js
  'devServer': {
    /** 💛 代理服务: 每一个属性是代理规则的配置,属性名称就是需要被代理的请求路径前缀,以哪个地址开始
     * '/api': 代表请求开发服务器中以'/api'开头的地址都会代理到接口当中
     * '/api'的值就是代理规则配置
     */
    proxy: {
      '/api': {
        // 这么配置之后就是说在开发服务器一旦请求了/api/xxx 就会被代理到 https://api.github.com/api/xxx
        // step-1 设置代理: http://locahost:8080/api/users ==> https://api.github.com/api/users
        // step-2 重写前缀(去掉/api): https://api.github.com/api/users ==> https://api.github.com/users
        // step-3 修改源:  changeOrigin
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' // 以上尖号开头,表示以 /api开头,替换成 ''
        },
        // 默认代理服务器会以在浏览器的localhost:8080作为代理请求的主机名
        // 不能使用 localhost:8080 作为请求 GitHub 的主机名
        // 一般服务器会判断是哪个主机名发出来的请求, Github不认识 locahost:8080, 所以无法指派服务器
        // ChangeOrigin=true 会把代理过后的地址作为请求的主机名去请求: api.github.com
        // 主机名是HTTP协议中的相关概念
        changeOrigin: true
      }
    }
  }
```