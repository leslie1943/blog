### Vue: Vue3中常用的API - 3 - reactive
- `reactive` 方法是用来创建一个响应式的<font color="#ff000">数据对象</font>, 该 `API` 也很好地解决了 `Vue2` 通过 `defineProperty` 实现数据响应式的缺陷, 用法很简单, 只需将数据作为参数传入即可, 代码如下

```vue
<template>
    <div id="app">
  	    <!-- 访问响应式数据对象中的 count  -->
  	    {{ state.count }}
    </div>
</template>

<script>
    // 导入 reactive
    import { reactive } from 'vue'
    export default {
        name: 'App',
        setup(){
            const obj = {count: 3}
            // 创建响应式数据
            const state = reactive(obj)

            console.info(state3)
            
            // 将响应式数据对象 state return 出去, 供 template 使用
            return {
                state,
            }
        }
    }
</script>
```
### 注意
