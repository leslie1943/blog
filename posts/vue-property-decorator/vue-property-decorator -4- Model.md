### vue-property-decorator -4- Model

### Vue2.x v-model on component

- Vue 组件提供`model:{prop?: string, event?:string}`让我们定制`prop`和`event`
- 默认情况下, 一个组件上`v-model`会把`value`用作`prop`且把`input`用作`event`,但是一些输入类型比较单选框和复选框的按可能想使用`vue prop`来达到不同的目的. 使用`model`选项可以回避这些情况产生的冲突.
```vue
<template>
    <input type="checkbox" :checked="checked" @change="$emit('change', $event.target.checked)">
</template>
<script>
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: String,
    checked: Boolean
  },
})
</script>
```
- 使用组件
```html
<base-checkbox v-model="loginValue" />
```
- 这里的 `loginValue` 的值将会传入这个名为 `checked` 的 `prop`. 同时当`<base-checkbox>`触发一个 `change` 事件并附带新的值的时候, 这个`loginValue`的`property`将会被更新
- 注意: 我们仍然需要在组件的 `props` 选项里声明 `checked` 这个 `prop`


### vue-property-decorator - @Model
- 🎃 子组件
```vue
<template>
  <div>
    <input type="checkbox" :checked="toggled" @change="onChangeCheck" />ss
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Model, Emit } from 'vue-property-decorator'

@Component
export default class Clock extends Vue {
  // // 重点在这里 🎃 toggled 取代了 value 作为默认 prop
  @Model('leslie' /* 🎃 */, { type: Boolean }) toggled!: boolean

  @Emit('leslie') // 重点在这里 🎃 @Emit事件是定义时候的事件名称 
  onChangeCheck() {
    console.info('onChangeCheck')
  }
}
</script>

```
- 🎃 父组件
```
 <VModelDemo :toggled="parentChecked" />
```