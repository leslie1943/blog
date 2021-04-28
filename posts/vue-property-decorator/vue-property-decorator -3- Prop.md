### vue-property-decorator -3- Prop
1. 在 `propName` 后可以用`?`或者`!`来修饰
- - `!`: 必选参数
- - `?`: 可选参数
2. `@Prop`接受一个参数可以是`变量类型`或者`对象`或者`数组`. `@Prop`接受的类型比如`Number`是`JavaScript`的类型, 之后定义的属性类型则是`TypeScript`的类型. 

```vue
<template>
  <div class="hello">
    <h4>[{{ msg }}] - [{{ count }}] - [{{ name }}]</h4>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string // 🎃 不接受参数
  @Prop(Number) readonly count!: number | undefined // 🎃 变量类型 
  @Prop({ default: 'suzhen' }) readonly name?: string // 🎃 对象类型 
  @Prop([String, Boolean]) readonly isTrue?: string | boolean | undefined
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

```