### vue-property-decorator -6- Provide/Inject
- 其本质是转换为 `inject` 和 `provide`, 这是 `vue` 中元素向更深层的子组件传递数据的方式.两者需要一起使用.与 `react` 的 `context` 十分的像.

### 💛 Provide demo
```vue
<template>
  <div>
    <div>Provide person: {{ person }}</div>
    <div>
      <el-button @click="changeName">Change name</el-button>
    </div>
    <InjectDemo />
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'
import InjectDemo from './InjectDemo.vue'

@Component({
  components: { InjectDemo }
})
export default class ProvideDemo extends Vue {
  person = {
    name: 'suzhen'
  }

  changeName() {
    this.person.name = this.person.name === 'suzhen' ? 'moon' : 'suzhen'
  }

  // @Provide() private man = this.person // 🎃 OK
  @Provide('man') readonly man = this.person // 🎃 OK
}
</script>

```

### 💛 Inject demo
```vue
<template>
  <div>Inject man: {{ man }}</div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator'

interface Man {
  name: string
}

@Component
export default class InjectDemo extends Vue {
  @Inject('man') man!: Man
}
</script>
```