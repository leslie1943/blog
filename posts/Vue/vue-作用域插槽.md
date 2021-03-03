## Vue中作用域插槽

### 目的
- 官方定义: 父组件应用子组件可以给插槽填充内容, 但一般只填充 html 标签, 里边的数据信息要由插槽自己提供, 这个过程称为`作用域插槽` (`插槽内容能够访问子组件中才有的数据是很有用的`)
- 自己理解: 父组件在用子组件填充插槽的时候, 有时候会用到子组件重插槽的数据.

### DEMO: 父组件
```html
<template>
  <div>
    <h1>作用域插槽: 绑定在<slot>;元素上的attribute被称为插槽Prop</h1>
    <slot-context>
      <h3>默认插槽: defalut slot content</h3>
      <!--  插槽写法 #title  -->
      <template #default="props">
        <h3 style="color:#FFAF40">父组件:default 默认作用域插槽</h3>
        <h3 style="color:#409EFF"> {{props.slotProps}}</h3>
        <!-- 💛 输出结果: { team: 'Liverpool', member: 'Steve Gerrard' }  -->
      </template>
      <!--  插槽写法 #title  -->
      <template #title="props">
        <h3 style="color:#FFAF40">父组件:title 具名的作用域插槽====使用#</h3>
        <h3 style="color:#409EFF">v-slot:title="props" {{props.slotProps}}</h3>
        <!-- 💛 输出结果: { name: 'leslie', love: 'javascript' }  -->
      </template>
      <!--  插槽写法 v-slot:  -->
      <template v-slot:item="props">
        <h3 style="color:#FFAF40">父组件:item 具名的作用域插槽====使用v-slot:</h3>
        <h3 style="color:#FFAF40">v-slot:item="props" => {{props.slotProps}}</h3>
        <!-- 💛 输出结果: { height: 110, width: 220 } -->
      </template>
      <!--  插槽写法 slot="slotName" slot-scope="slotProps"  -->
      <template slot="other" slot-scope="props">
        <h3 style="color:#FFAF40">父组件:other 具名的作用域插槽</h3>
        <h3 style="color:#FFAF40">v-slot:item="props" => {{props.slotProps}}</h3>
        <!-- 💛 输出结果: { company: 'ibm', id: '1983' } -->
      </template>
    </slot-context>
  </div>
</template>

<script>
import slotContext from './slot-context.vue'
export default {
  components: { slotContext }
}
</script>
```

### DEMO: 子组件
```html
<template>
  <div class="new-slot">
    <slot :slotProps="defaultObj" />
    <slot name="title" :slotProps="titleObj" />
    <slot name="item" :slotProps="itemObj" />
    <slot name="other" :slotProps="otherObj" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultObj: { team: 'Liverpool', member: 'Steve Gerrard' },
      itemObj: { height: 110, width: 220 },
      titleObj: { name: 'leslie', love: 'javascript' },
      otherObj: { company: 'ibm', id: '1983' },
    }
  }
}
</script>
<style lang="scss">
.new-slot {
  border: 1px solid gray;
  padding: 20px;
}
</style>
```