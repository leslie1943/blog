### Vue: 路由组件传参
- 路由文件
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from './Hello.vue'

Vue.use(VueRouter)

function dynamicPropsFn (route) {
  const now = new Date()
  return {
    name: (now.getFullYear() + parseInt(route.params.years)) + '!'
  }
}
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Hello }, // No props, no nothing
    { path: '/hello/:name', component: Hello, props: true }, // Pass route.params to props
    { path: '/static', component: Hello, props: { name: 'world' }}, // static values
    { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn }, // custom logic for mapping between route and props
    { path: '/attrs', component: Hello, props: { name: [1,2,3,4,5,6] }}
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route props</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/hello/Leslie">/hello/Leslie</router-link></li>
        <li><router-link to="/static">/static</router-link></li>
        <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
        <li><router-link to="/attrs">/attrs</router-link></li>
      </ul>
      <router-view class="view" foo="123"></router-view>
    </div>
  `
}).$mount('#app')
```
### Hello 组件
```html
<template>
  <div>
    <h2 class="hello">Hello {{name}} {{ $attrs }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'Vue!'
    }
  }
}
</script>
```

### 运行效果
- 访问`/`的时候: `Hello Vue!` => (没有传递 `name`,使用 `default value`)
- 访问`/hello/you`: `Hello Leslie` => (props:true, 所有使用路由上的值作为 name的value)
- 访问`/static`: `Hello world` => (显示指明 `props: { name: 'world' }`)
- 访问`/dynamic/1`: `Hello 2022!` => (根据路由的值计算后得到props的值`)
- 访问`/attrs`: `Hello [ 1, 2, 3, 4, 5, 6]!` => (显示指明 `props: { name: 'world' }`)