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