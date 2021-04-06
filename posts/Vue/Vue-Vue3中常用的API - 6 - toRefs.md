### Vue: Vue3中常用的API - 6 - toRefs
- `ref`是将对象的一个属性转换成响应式的数据, 而`toRefs`的作用就是将传入的对象里的所有属性值都转换为响应式数据对象,改函数支持一个参数, 即`obj`对象
```vue
<template>
  <p>{{ state.name.value }}</p>
  <p>{{ state.age.value }}</p>
  <p>{{ state.gender.value }}</p>
  <el-button type="success" @click="change">toRefs</el-button>
</template>
<script>
import { toRefs } from 'vue'
export default {
  setup() {
    const obj = {
      name: 'leslie',
      age: 22,
      gender: 1
    }
    // 将 obj 对象中所有的属性值都转换为响应式数据
    const state = toRefs(obj)

    function change() {
      console.info(' ----------- before change ----------- ')
      console.info('obj:', obj)
      console.info('state', state)
      console.info(state.name.value)
      console.info(state.age.value)
      console.info(state.gender.value)
      console.info(' -----------  changing ----------- ')
      state.name.value = 'Andy'
      state.age.value = 18
      state.gender.value = 2
      console.info(' ----------- after change ----------- ')
      console.info('obj:', obj)
      console.info('state', state)
      console.info(state.name.value)
      console.info(state.age.value)
      console.info(state.gender.value)

    }

    // 返回的是一个对象, 对象包含了每个包装过后的响应式数据对象
    return {
      state,
      change
    }
  }
}
</script>

```