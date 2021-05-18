`### TypeScript- xxx.d.ts 是干什么的?(shims-vue.d.ts)
```ts
// shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-echarts'  // 🚀🚀🚀 引入vue-echarts
```
- 以`shims-vue.d.ts` 是 为了告诉 `typescript`做的适配定义文件, 因为`.vue`文件不是一个常规的文件类型, `typescript`编译器不能理解`.vue`文件是干嘛的, 加上这一段是告诉`typescript` 这种`vue`文件是这种类型的
- 注释掉上面的代码, 会发现 `import` 的所有 `vue` 类型的文件都会报错
```ts
  component: () => import(/* webpackChunkName: "profile" */ '@/views/home/index.vue'),
// TS7016: Could not find a declaration file for module '@/views/home/index.vue'. src/views/home/index.vue.js' implicitly has an 'any' type.
// TS7016: Could not find a declaration file for module './App.vue'. src/App.vue.js' implicitly has an 'any' type.
```

```html
<script lang="ts">
    /* eslint-disable @typescript-eslint/camelcase */
    import { Vue, Component, Watch } from 'vue-property-decorator'
    import ECharts from 'vue-echarts' // 🚀🚀🚀 报错,按上面的方法在shims-vue.d.ts文件中引入即可
    import 'echarts/lib/chart/line'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/tooltip'
</script>
```


#### 如何识别 .d.ts
- 因为 `js` 本身是没有类型的, `typescript` 的语言服务需要 `.d.ts` 文件来识别类型, 这样才能做到相应的语法检查和智能提示, 我们自己编写的 `.d.ts` 文件直接放在项目的目录下, `typescript` 自己会去识别, 
- 只要他是 `.d.ts` 结尾就会被 `typescript` 自动识别
`