### Vue: Vue3中常用的API - 13 - getCurrentInstance
- 在`Vue2`中的任何一个组件想要获取当前组件的实例可以根据`this`来得到. 而在`Vue3`中我们大量的代码都在`setup`函数中, 并且该函数中`this`=>`undefined`,那么该如何获取到当前组件的实例呢
- 答案是 `getCurrentInstance`
```tsx
import {
  defineComponent,
  getCurrentInstance,
  ref,
  ComponentInternalInstance,
  AppContext,
} from 'vue'

const CurrentInstance = defineComponent({
  setup() {
    const num = ref(3)
    const instance = getCurrentInstance()
    console.info('instance', instance.ctx)
    console.info('instance', instance.proxy)
    // 断言
    ;(instance as any).ctx.$message.success('OK')

    return () => (
      <>
        <p>{num.value}</p>
      </>
    )
  },
})

export default CurrentInstance

```
- 因为 `instance` 包含的内容太多, 重点来看一下 `ctx` 和 `proxy`, 因为这两个才是我们想要的 `this` 的内容

### ctx
- $: (...)
- $ELEMENT: (...)
- $alert: (...)
- $attrs: (...)
- $confirm: (...)
- $data: (...)
- $el: (...)
- $emit: (...)
- $forceUpdate: (...)
- $loading: (...)
- $message: (...)
- $messageBox: (...)
- $msgbox: (...)
- $nextTick: (...)
- $notify: (...)
- $options: (...)
- $parent: (...)
- $prompt: (...)
- $props: (...)
- $refs: (...)
- $root: (...)
- $router: (...)
- $slots: (...)
- $store: (...)
- $watch: (...)


### proxy
[[Handler]]: Object
[[Target]]: Object
-    $: (...)
-    $ELEMENT: (...)
-    $alert: (...)
-    $attrs: (...)
-    $confirm: (...)
-    $data: (...)
-    $el: (...)
-    $emit: (...)
-    $forceUpdate: (...)
-    $loading: (...)
-    $message: (...)
-    $messageBox: (...)
-    $msgbox: (...)
-    $nextTick: (...)
-    $notify: (...)
-    $options: (...)
-    $parent: (...)
-    $prompt: (...)
-    $props: (...)
-    $refs: (...)
-    $root: (...)
-    $router: (...)
-    $slots: (...)
-    $store: (...)
-    $watch: (...)
[[IsRevoked]]: false

- 可以看到 `ctx` 和 `proxy` 的内容十分类似, 只是后者相对于前者外部包装了一层 `proxy`, 由此可说明 `proxy` 是响应式的