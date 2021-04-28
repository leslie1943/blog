### vue-property-decorator: 引用组件
- 看 带有 `🎃` 标记的代码 
- 在 `@Component({})` 中 ❗❗❗❗ 注册引入的组件 ❗❗❗❗
```vue
<template>
  <div class="home">
    <!-- 🎃 使用组件 🎃 -->
    <HelloWorld
      msg="TypeScript"
      :count="1943"
      name="transfer name from parent"
    />
    <Clock />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // 🎃 引入组件
import Clock from '@/components/Clock.vue' // 🎃 引入组件

@Component({   
  components: {
    HelloWorld, // 🎃 @Component 构造函数中 注册引入的组件 ❗❗❗❗
    Clock // 🎃 @Component 构造函数中 注册引入的组件 ❗❗❗❗
  },
})
export default class Home extends Vue {}
</script>

```
