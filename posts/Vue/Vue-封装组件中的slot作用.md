### Vue-封装组件中的slot作用
- vue 封装组件涉及三个东西
1. 一、 事件: `v-on`, `$emit`
2. 二、 传参通过 `props`
3. 三、 `slot`: `slot` 作用主要是可以实现内容分发, 组件标签内嵌套内容, 可通过`<slot></slot>`来定义占位的内容
- - `匿名slot`
- - `具名slot`
- 在编写可复用组件的时候, 时刻考虑组件是否可复用是有好处的. 一次性, 组件跟其他组件紧密耦合没关系,但是可复用组件一定要定义一个清晰的公开接口.

### 插槽写法
- `#default`: 默认插槽
- `#title`: 具名插槽
- `#default`

### DEMO: 父组件
```vue
<template>
  <div class="project-wrapper">
    <h1>作用域插槽 绑定在元素上的属性 ===> 插槽Prop</h1>
    <h2>
      <span style="color: #ff0000">slotProps</span>
      是子组件做作用域插槽元素上传递的属性
    </h2>
    <Slot-Context>
      <!--  插槽写法 #default  -->
      <template #default="props">
        <h3 style="color: #ffaf40">父组件: default 默认作用域插槽</h3>
        <h4>使用方式 - 子组件中: &lt; slot :slotProps="defaultObj" &gt;</h4>
        <h4>使用方式 - 父组件中: &lt; template #default="props" &gt;</h4>
        <h3 style="color: #409eff">{{ props.slotProps }}</h3>
      </template>

      <!--  具名插槽: 插槽写法 #title  -->
      <template #title="props">
        <el-divider />
        <h3 style="color: #ffaf40">父组件 具名的作用域插槽使用 #title</h3>
        <h4>
          使用方式 - 子组件中: &lt; slot name="title" :slotProps="titleObj" &gt;
        </h4>
        <h4>使用方式 - 父组件中: &lt;template #title="props"&gt;</h4>
        <h3 style="color: #409eff">
          v-slot:title="props" {{ props.slotProps }}
        </h3>
      </template>

      <!--  插槽写法 v-slot:  -->
      <template v-slot:item="props">
        <el-divider />
        <h3 style="color: #ffaf40">
          父组件:item 具名的作用域插槽, 使用v-slot:
        </h3>
        <h4>
          使用方式 - 子组件中: &lt; slot name="item" :slotProps="itemObj" &gt;
        </h4>
        <h4>使用方式 - 父组件中: &lt;template v-slot:item="props"&gt;</h4>
        <h3 style="color: #409eff">
          v-slot:item="props" => {{ props.slotProps }}
        </h3>
      </template>

      <!--  插槽写法 v-slot:  -->
      <template v-slot:other="props">
        <el-divider />
        <h3 style="color: #ffaf40">
          父组件: other 具名的作用域插槽 v-slot:other
        </h3>
        <h4>
          使用方式 - 子组件中: &lt; name="other" :slotProps="otherObj" &gt;
        </h4>
        <h4>使用方式 - 父组件中: &lt;template v-slot:other="props" &gt;</h4>
        <h3 style="color: #409eff">
          v-slot:other="props" => {{ props.slotProps }}
        </h3>
        <!-- 💛 输出结果: { company: 'ibm', id: '1983' } -->
      </template>
    </Slot-Context>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SlotContext from './Slot-Context.vue'
export default defineComponent({
  name: 'Home',
  components: {
    SlotContext,
  },
  setup: () => {},
})
</script>

```

### DEMO: 子组件
```vue
<template>
  <div class="new-slot">
    <slot :slotProps="defaultObj"></slot>
    <slot name="title" :slotProps="titleObj"></slot>
    <slot name="item" :slotProps="itemObj"></slot>
    <slot name="other" :slotProps="otherObj"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'Slot-Context',
  components: {},
  setup: () => {
    const defaultObj = reactive({ team: 'Liverpool', member: 'Steve Gerrard' })
    const titleObj = reactive({ name: 'leslie', love: 'javascript' })
    const itemObj = reactive({ height: 110, width: 220 })
    const otherObj = reactive({ company: 'ibm', id: '1983' })

    return {
      defaultObj,
      titleObj,
      itemObj,
      otherObj,
    }
  },
})
</script>
<style lang="scss">
.new-slot {
  border: 1px solid gray;
  padding: 20px;
}
</style>
```