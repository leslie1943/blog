### Vue: Vue3中常用的API - 5 - toRef
- `toRef`是将对象中的某个值转化为响应式数据,其接收两个参数, 第一个参数为`obj`对象, 第二个参数为对象中的属性名
```vue
<script>
    import { toRef } from 'vue'
    export default {
        setup(){
            const obj = { count: 3}
            // 将 obj 对象中的属性count的值转化为响应式数据
            const state = toRef(obj,'count')
            // 将 toRef 包装过的数据对象返回供template使用
            return {
                state
            }
        }
    }
</script>
```
- 表面上看上去 toRef 这个API好像非常的没用, 因为这个功能也可以用 ref 实现, 代码如下:
```vue
<script>
    import { ref } from 'vue'
    export default {
        setup(){
            const obj = {count: 3}
            // 将 obj 对象中属性count的值转化为响应式数据
            const state = ref(obj.count)

            // 将 ref 包装过的数据对象返回供 template 使用
            return {
                state
            }
        }
    }
</script>
```
- 乍一看好像还真是, 其实这两者是有区别的, 我们可以通过一个案例来比较一下, 代码如下
```vue
<template>
  <p>{{ state1 }}</p>
  <el-button @click="add1">增加 for ref</el-button>

  <p>{{ state2 }}</p>
  <el-button @click="add2">增加 for toRef</el-button>
</template>

<script>
import { ref, toRef } from 'vue'
export default {
  setup() {
    const obj1 = { count: 3 }
    const obj2 = { count: 3 }
    const state1 = ref(obj1.count)
    const state2 = toRef(obj2, 'count')

    function add1() {
      state1.value++
      console.log('obj1原始值：', obj1);
      console.log('state1响应式数据对象：', state1);
    }

    function add2() {
      state2.value++
      console.log('obj2原始值：', obj2);
      console.log('state2响应式数据对象：', state2);
    }

    return { state1, state2, add1, add2 }
  }
}
</script>


```
- 对于`ref`: 可以看到, 在对响应式数据的值进行 `+1`的操作后, 视图改变了, 原始值未改变, 响应式数据对象的值改变了, 这说明`ref`是对原数据的一个拷贝, 不会影响到原始值, 同时响应式数据对象值改变后会同步更新视图.
- 对于`toRef`: 在对响应式数据的值进行`+1`进行操作后, 视图未发生改变, 原始值改变了, 响应式数据对象的值也改变了, 这说明`toRef`是对原数据的一个引用, 会影响到原始值, 但是响应式数据对象值改变后不会更新视图

### 总结
- `ref`是对传入数据的拷贝; `toRef`是对传入数据的引用
- `ref`的值改变会更新视图; `toRef`的值改变不会更新视图
- 如果想让响应式数据和以前的数据关联起来, 并且更新响应式数据之后还不想更新UI, 那么就可以使用`toRef`