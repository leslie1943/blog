### Vue: Vue3中常用的API - 15 - 获取标签元素
- 最后再补充一个 `ref` 另外的作用, 那就是可以获取到标签元素或组件
- 在 `Vue2` 中, 我们获取元素都是通过给元素一个 `ref` 属性, 然后通过 `this.$refs.xx` 来访问的, 但这在 `Vue3` 中已经不再适用了
- 接下来看看 `Vue3` 中是如何获取元素的吧
```vue
<template>
  <div>
    <div ref="el">原始的内容</div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue'
export default defineComponent({
  setup() {
    // 创建一个DOM引用, 名称必须与元素的ref属性名相同
    const el = ref(null)

    // 在挂载后才能通过 el 获取到目标元素
    onMounted(() => {
      el.value.innerHTML = '内容被修改'
    })

    // 把创建的引用 return 出去
    return { el }
  }
})
</script>
```
- 获取元素的操作一共分为以下几个步骤:
1. 先给目标元素的 `ref` 属性设置一个值, 假设为 `el`
2. 然后在 `setup` 函数中调用 `ref` 函数, 值为 `null`, 并赋值给变量 `el`, 这里要注意, 该变量名必须与我们给元素设置的 ref 属性名相同
3. 把对元素的引用变量 `el` 返回 `return` 出去
```bash
    # 补充: 设置的元素引用变量只有在组件挂载后才能访问到, 因此在挂载前对元素进行操作都是无效的
```
- 当然如果我们引用的是一个组件元素, 那么获得的将是该组件的实例对象