## Vue: use() vs component()

####  Vue.use
- Vue.use 的作用是安装插件
- Vue.use 接收一个参数
- 如果这个参数是函数的话,Vue.use 直接调用这个函数注册组件
- 如果这个参数是对象的话,Vue.use 将调用 install 方法来注册组件
```
 * 官方文档: 
 * Vue.use 用于安装 Vue.js 插件。
 * 如果插件是一个对象,必须提供 install 方法
 * 如果插件是一个函数,它会被作为 install 方法
 * install 方法调用时，会将 Vue 作为参数传入
```
####  Vue.component
- Vue.component 的作用是注册组件
- Vue.component('component-name',{})
- Vue.component('component-name',the_import_component_object)

####  demo
```js
// 注册组件
import LeftRight from './src/left-right'
LeftRight.install = function (Vue) {
  Vue.component(LeftRight.name, LeftRight)
}
export default LeftRight

// main.js: 安装组件
import LeftRight from '../components/left-right'
Vue.use(LeftRight)
```