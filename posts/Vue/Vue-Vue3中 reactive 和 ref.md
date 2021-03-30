### Vue: Vue3中 reactive 和 ref

#### reactive
- `reactive` 用于为对象添加响应式状态. 接收一个js对象作为参数,返回一个具有响应式状态的副本. 
- 获取数据值的时候直接获取,不需要加`.value`
- 参数只能传入对象类型
```js
import { reactive } from 'vue'
// 响应式状态
const state = reactive({
  count: 0
})
// 打印count的值
console.log(state.count)
```

#### ref
- `ref` 用于为数据添加响应式状态. 由于 `reactive` 只能传入对象类型的参数,而对于基本数据类型要添加响应式状态就只能用`ref`了,同样返回一个具有响应式状态的副本. 
- 获取数据值的时候需要加`.value`. 可以理解为 `ref` 是通过 `reactive` 包装了一层具有value属性的对象实现的
- 参数可以传递任意数据类型,传递对象类型时也能保持深度响应式,所以适用性更广. 
- `vue 3.0` `setup` 里定义数据时推荐优先使用`ref`,方便逻辑拆分和业务解耦. 
```js
import { ref } from 'vue'

// 为基本数据类型添加响应式状态
const name = ref('Neo')
// 为复杂数据类型添加响应式状态
const state = ref({
  count: 0
})
// 打印name的值
console.log(name.value)
// 打印count的值
console.log(state.value.count)

```