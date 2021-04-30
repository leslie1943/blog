### vue-property-decorator -4- Computed & Watch


#### 🚀🚀 computed
- 原本 `Vue` 中的 `computed` 里的每个计算属性都变成了在前缀添加 `get` 的函数.
```vue
<template>
  <div>
    <el-row>
      <span style="padding: 10px">{{ currentYear }}</span>
    </el-row>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({})
export default class ShowYear extends Vue{
  // 🎃 加个前缀 get
  get currentYear() {
    return new Date().getFullYear()
  }
}
</script>
```

#### 🚀🚀 watch
- 我们可以利用 `vue-property-decorator` 提供的 `@Watch` 装饰器来替换 `Vue` 中的 `watch` 属性,以此来监听值的变化.
```js
// vue2.x 的写法
export default{
    watch: {
        'child': this.onChangeValue
            // 这种写法默认 `immediate`和`deep`为`false`
        ,
        'person': {
            handler: 'onChangeValue',
            immediate: true,
            deep: true
        }
    },
    methods: {
        onChangeValue(newVal, oldVal){
            // todo...
        }
    }
}
```
- 使用 `@Watch` 装饰器来改造
```js
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class YourComponent extends Vue {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) {}

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) {}

  @Watch('person')
  onPersonChanged2(val: Person, oldVal: Person) {}
}
```

### 💛💛💛  watch - demo 子组件
```vue
<template>
  <div style="text-align: left">
    <el-row>
      <el-col :span="24">person.name:{{ person.name }}</el-col>
      <el-col :span="24">person.age:{{ person.age }}</el-col>
      <el-col :span="24">person.company:{{ person.company }}</el-col>
    </el-row>
    <el-row>watch single name: {{ name }}</el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

interface Person {
  name: string
  age: number
  company: string
}

@Component
export default class WatchDemo extends Vue {
  // 定义属性
  @Prop(String) readonly name!: string
  @Prop(Object) readonly person!: Person

  // 普通函数
  onChange() {
    console.info('onchange')
  }

  mounted() {
    console.info('watch demo normal mounted')
  }

  // 🎃 watch 基本类型
  @Watch('name')
  onNameChange(newVal: string, oldVal: string) {
    console.info('watch oldVal', oldVal)
    console.info('watch newVal', newVal)
  }

  // 🎃 watch 对象
  @Watch('person', { immediate: true, deep: true })
  onPeronChange(newPeron: Person, oldPerson: Person) {
    console.info('watch oldPerson', oldPerson)
    console.info('watch newPeron', newPeron)
  }
}
</script>

```

### 💛💛💛 watch - demo 父组件
<template>
  <div class="home">
    <el-divider>🍀</el-divider>
    <WatchDemo :name="watchName" :person="watchPerson" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WatchDemo from '@/components/WatchDemo.vue'
@Component
export default class Home extends Vue {
  watchName = 'suzhen for watching'
  watchPerson = {
    name: 'person name',
    age: 22,
    company: 'facebook'
  }

  mounted() {
    setTimeout(() => {
      this.watchName = new Date().getTime() + '-' + 'suzhen watch name'
      this.watchPerson = {
        name: new Date().getTime() + '-' + 'watchPerson  name',
        age: new Date().getTime(),
        company: new Date().getTime() + '-' + 'watchPerson  company'
      }
    }, 2000)
  }
}
</script>
