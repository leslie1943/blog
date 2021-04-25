### Vue-Vue3中常用的API - 1 - setup(1)
- `setup`函数是 `Composition API`的入口函数,我们的变量方法都定义在该函数的定义里
```vue
<template>
    <div id="app">
        <p>{{number}}</p>
        <button @click="add">增加</button>
    </div>
</template>
<script>
// 1. 从 vue 中引入 ref
import { ref } from 'vue'

export default {
    name: 'App',
    setup(){
        // 2. 用 ref 函数包装一个响应式变量 number
        let number = ref(0)

        // 3. 设定一个方法
        function add(){
            // number是被ref函数包装过了的,其值保存在.value中
            number.value++
        }

        // 4. 将 number 和 add 返回出去, 供 template 使用
        return {number, add}
    }
}
</script>
```
- 上述代码中用到了 `ref` 函数, 只需要理解它的作用是包装一个响应式的数据即可, 并且你可以将 `ref` 函数包装过的变量看作是`Vue2 data` 中的变量

### 注意
- 在 `Vue2` 中, 我们访问 `data` 或 `props` 中的变量, 都是通过类似 `this.number` 这样的形式去获取的, 但要特别注意的是, 在 `setup` 中, `this` 指向的是 `undefined`, 也就是说不能再向`Vue2`一样通过 `this` 去获取变量了
- 那么该如何获得 `props`中的数据呢?
- 在`setup`函数里还有两个参数, 分别是`props`和`context`, 前者`props`存储着定义外部组件传递的属性; 后者`context`是一个上下文对象, 能访问到`attr`,`emit`,`slots`等属性,
- 其中 `emit`就是我们在`Vue2`中与父组件通信的方法.

