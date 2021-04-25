### Vue: Vue3中常用的API - 16 - 组件传参v-model
- 组件支持 `v-model` 参数
- 在 `Vue2.x` 时, 我们要想给子组件传值, 还得单独传入, 并且配合修饰符`.sync`进行数据同步更新.
- `Vue3.x` 直接以 `v-model:xxx="xxx"` 形式传入参数.

### 子组件
```vue
<template>
  <div class="Input">
   子组件 <el-input @input="first" v-model="name" />
  </div>
</template>

<script >
import { defineComponent } from "vue";
export default defineComponent({
  name: 'Input',
  props: {
    title: {
      type: String,
      default: () => "suzhen"
    }
  },
  data() {
    return {
      name: ''
    }
  },

  methods: {
    first() {
      this.$emit("update:title", this.name)
    }
  },
  mounted() {
    this.name = this.title
  }
})
</script>
```

### 父组件
```vue
<template>
  <div class="project-wrapper">
    <el-divider>InputModel </el-divider>
      <div>父组件 {{ title }}</div>
    <InputModel v-model:title="title" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import InputModel from './V-Model-Input.vue'
export default defineComponent({
  name: 'Home',
  components: {
    InputModel,
  },
  setup: () => {
    const title = ref('title')
    return { title }
  },
})
</script>

```