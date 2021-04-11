### Vue: Vue3中常用的API - 8 - shallowRef
- 这是一个浅层的`ref`, 和`shallowReactive`一样是来做性能优化的.
- `shallowReactive`是监听对象第一层的数据变化用于驱动视图更新,那么`shallowRef`则是监听`.value`的值的变化来更新视图的

```vue
<template>
  <p>{{ state.a }}</p>
  <p>{{ state.first.b }}</p>
  <p>{{ state.first.second.c }}</p>
  <el-button @click="change1">Change 1</el-button>
  <el-button @click="change2">Change 2</el-button>
</template>

<script>
import { shallowRef, defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const obj = {
      a: 1,
      first: {
        b: 2,
        second: {
          c: 3
        }
      }
    }
    const state = shallowRef(obj)
    console.info('shallowRef state', state)

    function change1() {
      // 直接将 state.value重新赋值
      state.value = {
        a: 7,
        first: {
          b: 8,
          second: {
            c: 9
          }
        }
      }
      console.info('change1', state)
    }

    function change2() {
      state.value.a = 11
      state.value.first.b = 12
      state.value.first.second.c = 13
      console.info('change2', state)
    }
    return {
      state,
      change1,
      change2
    }
  }
});
</script>
```
- 首先看一下被 `shallowRef` 包装过后是怎样的结构
```js
// value: Object
// {
//     a: 1,
//     first:{
//         b: 2,
//         second:{
//             c: 3
//         }
//     }
// }
```
- 点击了第二个按钮, 发现数据改变了, 但是视图没有更新
- 点击了第一个按钮, `.value`被重新赋值了, 发现数据改变了, 视图也进行了更新
- 这么一看, 未免也太过麻烦了, 改个数据还要重新赋值, 不要担心, 此时我们可以用到另一个API, 叫做 `triggerRef` , 调用它就可以立马更新视图, 其接收一个参数 `state` , 即需要更新的 `ref` 对象

### triggerRef
```vue
<template>
  <p>{{ state.a }}</p>
  <p>{{ state.first.b }}</p>
  <p>{{ state.first.second.c }}</p>
  <el-button @click="change">Change by triggerRef</el-button>
</template>

<script>
import { shallowRef, defineComponent, triggerRef } from 'vue'
export default defineComponent({
  setup() {
    const obj = {
      a: 1,
      first: {
        b: 2,
        second: {
          c: 3
        }
      }
    }
    const state = shallowRef(obj)
    console.info('shallowRef state', state)
    function change() {
      state.value.a = 11
      state.value.first.b = 12
      state.value.first.second.c = 13
      // 修改后立即驱动更新视图
      triggerRef(state)
      console.info('change', state)
    }
    return {
      state,
      change,
    }
  }
});
</script>
```
- 可以看到, 我们没有给 `.value` 重新赋值, 只是在修改值后, 调用了 `triggerRef` 就实现了视图的更新