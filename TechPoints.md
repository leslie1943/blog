### 🚀 Vue3 创建步骤
- 首先安装脚手架:
```bash
    # npm install -g @vue/cli (已经安装过的就不用了)
    # yarn global add @vue/cli (已经安装过的就不用了)
```
- 执行命令
```bash
`vue create <project_name>` 一直按照提示选择即可
```
- 安装 `element-next`: `npm install element-plus --save`

- 基础的 `Vue3+Element-Plus` 项目: `git clone https://github.com/leslie1943/vue3-element-plus-base-cli.git`

### 🚀 初始化一个Vite项目
1. 初始项目: `npm init @vitejs/app <project_name> --template vue-ts`
2. 配置路由: `npm install vue-router@4 --save`
3. 数据状态: `npm i vuex@next --save`
4. 安装UI: `npm install element-plus --save`
5. 以上步骤完成后, `main.ts`如下
```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
```

### 🚀 一个Vite创建的Vue项目中, 即支持.vue文件组件, 又支持.tsx文件组件, 如何配置?
- step-1: 
```bash
# npm install @vitejs/plugin-vue-jsx
```
- step-2: 
```js
// vite.config.ts
import vuejsx from '@vitejs/plugin-vue-jsx' // support tsx component

export default defineConfig({
  // 在 plugins 配置 vuejsx 的构造函数, 让项目支持 tsx 形式组件
  plugins: [vue(), vuejsx({})] 
}
```
### 🚀 让 vite 支持 sass/scss
- 安装依赖: `npm install sass -D`
- 重新运行: `npm run dev`

### 🚀 Vite Release 发布
- npm run build: 生成`dist`
- 将`dist`整体 拷贝至 `nginx/html`目录下
- `start nginx`: 启动 `nginx` 服务
- `nginx -s reload`: 重启 `nginx` 服务
- 浏览器查看`http://localhost:3343/`: `2000`是`3343`配置的端口

### 🚀 Vite Release 发布 Nginx 代理配置
1. ✅ 在`项目中`的配置, 遇到 `/gdszyepro` 转换成 `https://epro-ps231-gdszy.test.viewchain.net/gdszyepro`
2. ✅ 在`项目中`的配置, 遇到 `/api` 转换成 `https://gitlab.devops.viewchain.net`
```js
// vite.config.ts
server: {
    port: 3343, //启动端口
    open: true,
    proxy: {
      '/gdszyepro': {
        target: 'https://epro-ps231-gdszy.test.viewchain.net/gdszyepro',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gdszyepro/, ''),
      },
       '/api': {
        target: 'https://gitlab.devops.viewchain.net',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
    cors: true,
  }
```
2. ✅ 对应的在`nginx`的配置
```nginx
  server {
    server_name  localhost;
    listen       3343;

    # 🔶🔷 这里是重点 🔶🔷
    location /gdszyepro {
        proxy_pass https://epro-ps231-gdszy.test.viewchain.net/gdszyepro; # 🔶🔷 这里是重点 🔷🔶
    }

    # 🔶🔷 这里是重点 🔶🔷
    location /api {
        proxy_pass https://gitlab.devops.viewchain.net; # 🔶🔷 这里是重点 🔷🔶
    }

    location / {
        root   html/dist;
        index  index.html index.htm;
        try_files  $uri $uri/ /index.html;
    }
  }
```
- 如果缺少了以上的配置, 启动服务后调用接口的时候可能会出现 `405 Not Allowed`, 访问页面报405错误


### 🚀 使用 curl 模拟POST 请求
- curl -v -X POST -d "'name':'suzhen'" http://localhost:1234/
- 得到的结果可能:
```bash
得到的结果可能如下
Note: Unnecessary use of -X or --request, POST is already inferred.
* Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 1234 (#0)
> POST / HTTP/1.1
> Host: localhost:1234
> User-Agent: curl/7.55.1
> Accept: */*
> Content-Length: 15
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 15 out of 15 bytes
* Empty reply from server
* Connection #0 to host localhost left intact
```

### 🚀 MongoDB 操作相关
- `mongod.exe`: 启动 `MongoDB` 数据库服务的, `MongoDB` 的服务端: 不是图形化软件,需要运行在命令行.
- `mongo.exe`: `MongoDB` 的客户端, 连接`MongoDB`服务端, 操作`MongoDB`数据库的数据
- 全局化配置两个命令: `我的电脑-属性-高级选项-环境变量-系统变量-Path-编辑`, 然后把`mongodb bin 目录粘贴进去`
- 启动和停止`MongoDB`数据库服务
- 1. 启动服务端,并把数据库创建在配置的目录 ====>>>> `mongod --dbpath="C:\Leslie\MongoDB\data"` (`C:\Leslie\MongoDB\data`: `数据存储目录`) 默认占用端口`27017`
- 2. `mongoshell` 是默认安装的,使用的命令行命令`mongo`其实就是使用`mongoshell` 工具启动客户端 
- - 🍪`mongo --port 28015`指定端口号
- - 🍪`mongo "mongodb://mongodb0.example.com:28015"`: 连接远程主机上的`MongoDB`服务
- - 🍪`mongo --host mongodb0.example.com:28015`: 远程主机
- 3. 如果单独执行`mongod`, 它会默认使用执行`mongod`命令所在的磁盘根目录的`/data/db`作为存储目录,找不到的化话会启动失败

- `mongo shell` 执行环境 内置命令
```bash
  # show dbs: 查看数据库列表
  # db: 查看当前数据库
  # use <DATABASE_NAME>: 切换到当前DATABASE_NAME的数据库下,如果没有数据,这个库依旧显示不出来

  # db.user.insert({name: 'leslie',age: 22})
  # db.dropDatabase(): 删除数据库 <<<<<== 先切换数据库

  # collections <<<< ===== >>>> table
  # show collections: 查看辑合
  # db.<collection_name>.drop()

  # 文档
  # _id 保留用作主键
  # 字段名称不能包含空字符
  # 建议不要使用 $, 开头和中间都不建议使用
```
- 查询相关

| MongoDB | SQL | 描述 |
| ---- | ---- | ---- |
| db.inventory.find( {} ) |  SELECT * FROM inventory | 查询全部 | 
| db.inventory.find( {},{file1:1, field2:1} ) |  - | 指定返回的文档字段 | 
| db.inventory.find( {status: 'D' }) | SELECT * FROM inventory WHERE status="D" | 相等条件查询 | 
| db.inventory.find( {status: 'A', qty:{$lt: 30} }) | SELECT * FROM inventory WHERE status="A" AND qty < 30 | 指定 AND 条件 | 
| db.inventory.find({$or: [{status: "A"}, {qty:{$lt : 30} ]}) | SELECT * FROM inventory WHERE status="A" OR qty < 30 | 指定 OR 条件 | 
| db.inventory.find({status: 'A', $or: [{qty: {$lt: 30}}, { item: /^p/}]}) | SELECT * FROM inventory WHERE status="A" AND ( qty < 30 OR item LIKE "p%" ) | 指定 AND 和 OR 条件 | 
| db.inventory.find({status: {$in:["A","D"]}}) | SELECT * FROM inventory WHERE status in ("A", "D") | 使用查询运算符指定条件 | 



### 🚀 Flutter 在 VS code 启动
- `flutter emulators --launch LeslieAVD`
- `flutter run`

### 🚀 Gatsby 脚手架
- `npm install gatsby-cli -g`
- `gatsby new react-gatsby-guide https://github.com/gatsbyjs/gatsby-starter-hello-world`


### 🚀 解决 vue element ui querySelector of undefined
- 方法1: 更改版本
- 方法2: 添加 css
```css
 .el-table thead,

 .el-table__header-wrapper {
  display: none;

}
```

### 🚀 Vite 引入全局的 scss 预设样式
在`vite.config.js`下添加`css`属性
```js
export default {
  // plugins: {....},
  // base: {....},
  // resolve: {....},
  // server: {....},
  css: {
    preprocessorOptions: {
      scss: {
        // 路径是当前 vite.config.js 相关路径
        additionalData: '@import "./src/assets/scss/all.scss";',
      },
    },
  },
}
```

### 🚀 Vite 路由懒加载 支持 tsx 和 vue 文件
```ts
// 在 shims-vue.d.ts 文件中 加入以下声明
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.tsx' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```
- 在引入路由文件时需要加后缀
```bash
  # component: () => import('@/views/Home/index.vue'),
  # component: () => import('@/views/Login/index.tsx'),
```

### 🚀 要从头开发一个Vue2.x的项目建议参考
- [vue-app-base](https://github.com/leslie1943/vue-app-base)
- 包含: `loader开发`,`plugin开发`,`Git hooks`,`eslint`格式化, `stylelint`CSS格式化
- 包含: `webpack` 从零开始配置
- 以及对一些配置的详细讲解 `markdown-files`

### 🚀 使用 Yapi 管理接口
- `github`: `https://github.com/YMFE/yapi`
- 使用我们提供的 `yapi-cli` 工具, 部署 `YApi` 平台是非常容易的. 执行 `yapi server` 启动可视化部署程序, 输入相应的配置和点击开始部署, 就能完成整个网站的部署. 部署完成之后, 可按照提示信息, 执行 `node/{网站路径/server/app.js}` 启动服务器. 在浏览器打开指定 `url`, 点击登录输入您刚才设置的管理员邮箱, 默认密码为 `ymfe.org` 登录系统(默认密码可在个人中心修改). 
- 如何部署YAPI[https://blog.csdn.net/Lb_fly0505/article/details/104670548]

### 🚀 使用 Yapi - 1 - 本地搭建
- 全局安装依赖: `npm install -g yapi-cli --registry https://registry.npm.taobao.org`
- 启动数据库 `mongod --dbpath="C:\Leslie\MongoDB\data"`
- 启动配置 `yapi server`: 访问: `http://localhost:9090`
- 安装默认配置, 如果成功则出现
```
    部署日志
    当前安装版本： 1.9.2
    连接数据库成功!
    开始下载平台文件压缩包...
    http://registry.npm.taobao.org/yapi-vendor/download/yapi-vendor-1.9.2.tgz
    部署文件完成, 正在安装依赖库...
```

### 🚀 使用 Yapi - 2 - 服务管理
```
    npm install pm2 -g  //安装pm2
    cd {project_name}  C:\Users\leslie\my-yapi
    pm2 start "vendors/server/app.js" --name yapi //pm2管理yapi服务
    pm2 info yapi //查看服务信息
    pm2 stop yapi //停止服务
    pm2 restart yapi //重启服务
```

### 🚀 使用 Yapi - 3 - 服务管理
- 访问 `http://127.0.0.1:3000/` 端口是步骤一设置的
- 用户名: `admin@admin.com` (可在`MongoDB找到`)  密码: `ymfe.org` (默认密码)

### 🚀 使用 Yapi - 4 - 扩展教程 chrome 安装 yapi 
- chrome 安装 yapi 扩展教程[https://juejin.cn/post/6844904057707085832]
- 使用 Edge 浏览器搜索 `cross-request` 添加扩展
- YApi 新版如何查看 http 请求数据[https://juejin.cn/post/6844903795743260685]

### ts-node
- 运行 ts 文件的 包

### shims-vue.d.ts
```ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```
- 是什么? ===> `typescript` 中的 类型声明文件
- 为什么? ===> 加载`.vue`文件的时候, `TS 编译器` 不知道它的类型是什么? 
- 怎么做? ===> 在根目录下创建`shims-vue.d.ts`文件
- 什么用? ===> 所有以`.vue`结尾的文件模块, 它的类型就是这里导出的类型(`componenet`), 这个`componenet` 对应的就是 `DefineComponent`, 来自于`Vue`本身. 这样在加载`vue`组件的时候,`typescript`才能正确的识别出它的类型