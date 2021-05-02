### Vue: 组件上的 v-moel
- 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件, 但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的. model 选项可以用来避免冲突

- 默认情况下, 一个组件上`v-model`会把`value`用作`prop`且把`input`用作`event`,但是一些输入类型比较单选框和复选框的按可能想使用`vue prop`来达到不同的目的. 使用`model`选项可以回避这些情况产生的冲突.


### demo
```vue
<template>
  <div>
    <input type="checkbox" :checked="toggled" @change="changeHandle" />ss
  </div>
</template>

<script>
export default {
  model: {
    // prop:'checked', // 🎃 正常是这样
    // event: 'ttt' // 名字也是随便的, 只要在 $emit('ttt')对应上就可以
    prop: 'toggled', // 声明要使用的 属性名
    event: 'change'

  },
  props: {
    // checked: Boolean, // // 🎃 正常是这样
    toggled: Boolean // 重命名 使用toggled 取代 value 这个 prop
  },
  methods: {
    changeHandle($event) {
      // 这里的 原生事件和属性依然不变
      console.info('$event.target.checked', $event.target.checked)
      this.$emit('change', $event.target.checked)
    }
  }
}
</script>

```