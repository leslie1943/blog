### Vue: Vue3中常用的API - 8 - markRaw
- `markRaw`方法可以将原始数据标记为非响应式的, 也就是说即使使用`ref`或者`reactive`将其包装,仍无法实现数据响应式, 接收一个参数(原始数据), 返回被标记后的数据
```vue
<template>
  <p>{{ stateObj.name }}</p>
  <p>{{ stateObj.age }}</p>
  <el-button type="primary" @click="change">change age for raw obj</el-button>
</template>

<script>
import { defineComponent, markRaw, reactive } from 'vue'
export default defineComponent({
  setup() {
    const obj = {
      name: '荣光无限',
      age: 22
    }

    // 通过 markRaw标记原始数据obj, 使其数据更新不再被追踪
    const rawObj = markRaw(obj)

    // 试图用 reactive 包装 rawObj, 使其变成响应式数据
    const stateObj = reactive(rawObj)

    function change() {
      stateObj.age = 100
      // { age: 100, name: "荣光无限" }
      console.info('rawObj', rawObj)
      // { age: 100, name: "荣光无限" }
      console.info('stateObj', stateObj)
    }

    return {
      change, stateObj
    }
  }
})
</script>

<style>
</style>
```