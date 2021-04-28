### vue-property-decorator: 定义变量和方法
- 看 带有 `🎃` 标记的代码 
```vue
<template>
  <div>
    <h1>{{ count }}</h1>
    <el-row>
        <el-button @click="add">+</el-button>
        <el-button @click="reduce">-</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit } from 'vue-property-decorator'
@Component
export default class Clock extends Vue {
  count = 0 // 🎃 定义变量

  // 🎃 定义方法: 修改逻辑
  add() {
    this.count++
  }

  reduce() {
    this.count--
  }
}
</script>
```

- 在普通的vue中相当于
```vue
<script>
export default {
  data(){
    return {
      count: 0
    }
  },
  methods:{
    add() {
      this.count++
    }

    reduce() {
      this.count--
    }
  }
}
</script>
```
