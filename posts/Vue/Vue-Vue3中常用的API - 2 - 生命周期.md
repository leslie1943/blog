### Vue: Vue3中常用的API - 2 - 生命周期
- Vue2 中有 `beforeCreate`,`created`,`beforeMount`,`mounted`,`beforeUpdated`,`updated`,`beforeDestory`,`destoryed`
- Vue3 中 这些生命周期有所变化, 并且调用方式也有一些变化

| Vue2 | Vue3 |
| -- | -- |
| `beforeCreate` | `setup` |
| `created` | `setup` |
| `beforeMount` | `onBeforeMount` |
| `mounted` | `onMounted` |
| `beforeUpdate` | `onBeforeUpdate` |
| `updated` | `onUpdated` |
| `beforeDestory` | `onBeforeUnmount` |
| `destoryed` | `onUnMounted` |


### 调用方式
- Vue3 中的生命周期调用也很简单, 同样是先从 `vue` 中导入, 再进行直接调用
```vue
<template>
    <div id="app"></div>
</template>

<script>
    import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, unMounted} from 'vue'
    export default {
        name: 'App',
        setup(){
            onBeforeMounted(() => {
                // 挂载前执行某些代码
            })
            
            onMounted(() => {
                // 挂载时执行某些代码
            })

            onBeforeUpdate(() => {
                // 更新前执行某些代码
            })

            onUpdated(() => {
                // 更新后执行某些代码
            })

            onBeforeUnmount(() => {
                // 在组件销毁前执行某些代码
            })

            unMounted(() => {
                // 在组件销毁后执行某些代码
            })
        }
    }
</script>
```