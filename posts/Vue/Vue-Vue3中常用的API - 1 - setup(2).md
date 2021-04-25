## Vue-Vue3中常用的API - 1 - setup(2)
- setup 函数是一个新的组件选项. 作为在组件内试用`Composition API`的入口点. 我们分为4个方面来讲解它.

### 1. 调用时机
- 创建组件实例, 然后初始化`props`, 紧接着就调用 `setup` 函数, 从生命周期的角度来看, 它会在`beforeCreate`之前执行. 也就是创建组件先执行`setup`,`beforeCreate`,`create`

### 2. this指向
- 由于不能在`setup`函数中试用`data`,`methods`,为了避免`Vue`出错, 所以把`setup`函数中`this`修改成了`undefined`

### 3. 函数参数
- setup(`props`,`context`)
- `props`: 接收组件传递过来的所有数据,并且都是响应式的
```tsx
import { defineComponent } from 'vue'
const PropsDemo = defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
 //`context`: 该参数提供一个上下文对象
  setup(props, {attrs, slots, emit}) {
    console.info('attrs', attrs)
    console.info('slots', slots)
    console.info('emit', emit)
    return () => <>{props.title}</>
  },
})
export default PropsDemo
```

- `context`: 该参数提供一个上下文对象, 从原来的2.x中选择性的暴露了一些属性
- `attrs`,`slots`,`emit`
- 上面, `attrs` 和 `slots` 都是内部组件实例上对应项的代理, 可以确保在更新后仍然还是最新的值. 所以这里可以使用解构语法. 


### 4. 返回值
- `vue` 单文件组件中: `setup` 函数返回值渲染到页面上, 但前提是, `setup` 返回值必须是一个对象, 否则返回其它值则渲染无效
- `tsx|jsx` 文件中 返回 `tsx` 或者 `jsx`
