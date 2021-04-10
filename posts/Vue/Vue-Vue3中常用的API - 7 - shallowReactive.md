### Vue: Vue3中常用的API - 7 - shallowReactive
- 这是一个浅层的`reactive`, 难道意思是原本的`reactive`是深层的呗, 没错, 这是一个性能优化的API.
- 其实 `obj` 作为参数传递给`reactive`生成响应式数据对象时, 若`obj`的层级不止一层, 那么会将每层都用`Proxy`包装一次
```vue
<template>
  <p>Shallow reactive</p>
</template>

<script>
import { reactive } from 'vue'
export default {
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
    // 将 obj 对象中所有的属性值都转换为响应式数据
    const state = reactive(obj)
    console.info('state', state)
    console.info('state', state.first)
    console.info('state', state.first.second)
    /**
     * 打印结果:
     * Proxy {a: 1, first: {…}}
     * Proxy {b: 2, second: {…}}
     * Proxy {c: 3}
     */
  }
}
</script>
```
- 设想一下如果一个对象层级比较深, 那么每一层都用 `Proxy` 包装后, 对于性能是非常不友好的.

### shallowReactive
```vue
<template>
  <p>Shallow reactive</p>
</template>

<script>
import { shallowReactive } from 'vue'
export default {
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
    // 将 obj 对象中所有的属性值都转换为响应式数据
    const state = shallowReactive(obj)
    console.info('state', state)
    console.info('state', state.first)
    console.info('state', state.first.second)
    /**
     * 打印结果:
     * Proxy {a: 1, first: {…}}
     * {b: 2, second: {…}}
     * {c: 3}
     */
  }
}
</script>

```
- 结果非常的明了了, 只有第一层被 `Proxy` 处理了, 也就是说只有修改第一层的值时, 才会响应式更新
```vue
<template>
  <p>state.a:{{ state.a }}</p>
  <p>state.first.b:{{ state.first.b }}</p>
  <p>state.first.second.c:{{ state.first.second.c }}</p>
  <el-button type="primary" @click="changeLevel1">changeLevel1</el-button>
  <el-button type="primary" @click="changeLevel2">changeLevel2</el-button>
</template>

<script>
import { shallowReactive } from 'vue'
export default {
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
    // 将 obj 对象中所有的属性值都转换为响应式数据
    const state = shallowReactive(obj)

    function changeLevel1() {
      state.a = 1943
    }

    function changeLevel2() {
      state.first.b = 2002
      state.first.second.c = 2046
      console.info(state)
    }

    return {
      state, changeLevel1, changeLevel2
    }
  }
}
</script>
```
- 我们点击了第一个按钮, 改变了第一层的 `a` 时, 整个视图进行了更新
- 点击了第二个按钮, 改变了第二层的 `b` 和第三层的 `c`, 虽然值发生了改变, 但是视图却没有进行更新
- 由此可说明, `shallowReactive` 监听了第一层属性的值, 一旦发生改变, 则更新视图
