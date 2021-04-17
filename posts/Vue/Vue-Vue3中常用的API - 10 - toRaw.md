### Vue: Vue3中常用的API - 10 - toRaw
- `toRaw`方法用于获取`ref`和`reactive`对象的原始数据的

```tsx
import { defineComponent, reactive } from 'vue'

const ToRaw = defineComponent({
  setup() {
    const obj = {
      name: 'leslie',
      age: 11,
    }
    const state = reactive(obj)
    const changeState = () => {
      state.age = 100
      console.info(obj)
      console.info(state)
    }
    const changeObj = () => {
      obj.age = 99
      console.info(obj)
      console.info(state)
    }

    return () => (
      <>
        <p>{state.age}</p>
        <p>{state.name}</p>
        <el-button onClick={changeState}>changeState</el-button>
        <el-button onClick={changeObj}>changeObj</el-button>
      </>
    )
  },
})
export default ToRaw

```
- 我们改变了 `reactive` 对象中的数据, 于是看到原始数据 `obj` 和被 `reactive` 包装过的对象的值都发生了变化, 由此我们可以看出, 这两者是一个引用关系
- 那么此时我们就想了, 那如果直接改变原始数据 `obj` 的值, 会怎么样呢？答案是: `reactive` 的值也会跟着改变, 但是视图不会更新
- 由此可见, 当我们想修改数据, 但不想让视图更新时, 可以选择直接修改原始数据上的值, 因此需要先获取到原始数据, 我们可以使用 `Vue3` 提供的 `toRaw` 方法

- toRaw 接收一个参数, 即 ref 对象或 reactive 对象
```js
const raw = toRaw(state)
console.log(obj === raw)   // true
```
- 上述代码就证明了 `toRaw` 方法从 `reactive` 对象中获取到的是原始数据, 因此我们就可以很方便的通过修改原始数据的值而不更新视图来做一些性能优化了
- 注意: 补充一句,当 `toRaw` 方法接收的参数是 `ref` 对象时,需要加上` .value` 才能获取到原始数据对象
- 完整 demo
```tsx
import { defineComponent, reactive, ref, toRaw } from 'vue'

const ToRaw = defineComponent({
  setup() {
    const obj = {
      name: 'leslie',
      age: 11,
    }
    const state = reactive(obj)
    const raw = toRaw(state)

    const refNum = ref({ num: 1943 })
    const rawNum = toRaw(refNum.value)

    const changeState = () => {
      state.age = 100
      console.info('obj', obj)
      console.info('state', state)
      console.info('raw', raw)
      console.info('raw==obj', raw == obj) // true
    }
    const changeObj = () => {
      obj.age = 99
      console.info('obj', obj)
      console.info('state', state)
      console.info('raw', raw)
      console.info('raw==obj', raw == obj) // true
    }

    const changeRefNumber = () => {
      refNum.value.num = 1989
      console.info('refNum', refNum)
      console.info('rawNum', rawNum)
    }
    const changeRawNumber = () => {
      rawNum.num = 2046
      console.info('refNum', refNum) // efImpl {_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}
      console.info('rawNum', rawNum) // {num: 2046}
    }

    return () => (
      <>
        <p>toRaw方法用于获取ref和reactive对象的原始数据的</p>
        <p>{state.age}</p>
        <p>{state.name}</p>
        <p>refNum: {refNum.value.num}</p>
        <el-button onClick={changeState}>change State</el-button>
        <el-button onClick={changeObj}>change Obj</el-button>
        <el-button onClick={changeRefNumber}>change Ref Number</el-button>
        <el-button onClick={changeRawNumber}>change Raw Number</el-button>
      </>
    )
  },
})
export default ToRaw

```