### Vue: Vue3中常用的API - 4 - ref
- 在介绍`setup`函数的时候, 我们使用 `ref`函数包装了一个响应式的数据对象, 这里表面上看上去跟`reactive`好像功能一模一样, 确实差不多, 因为 `ref`就是通过`reactive`包装了一个对象,然后将值传给对象中的`value`属性, 这就解释了为什么每次访问`ref`封装的响应式数据需要加上`.value`
- 我们可以简单地把`ref(obj)`理解为`reactive({value: obj})`
```vue
<script>
    import {ref, reactive} from 'vue'
    export default {
        name: 'App',
        setup(){
            const obj = {count: 3}
            const state1 = ref(obj)
            const state2 = reactive(obj)

            console.info(state1)
            console.info(state2)
        }
    }
</script>
```
- 需要注意的是,这里的`.value`是在`setup`函数中访问`ref`包装的对象时才需要加
- 在`template`模板中访问时是不需要的, 因为在编译时, 会自动识别是否为`ref`包装的.
- 那么如何选择`ref`和`reactive`呢?
1. 基本类型值(`String`,`Number`,`Boolean`等)或单值对象(类似像`{count: 3}`)这样只有一个属性值的对象, 使用`ref`
2. 引用类型值(`Object`,`Array`)使用`reactive`