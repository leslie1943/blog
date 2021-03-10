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