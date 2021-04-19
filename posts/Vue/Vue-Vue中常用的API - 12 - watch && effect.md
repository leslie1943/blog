### Vue: Vue3中常用的API - 12 - watch && effect
- `watch`和`watchEffect`都是用来监视某项数据变化而执行指定操作的. 但用法上有些区别
- `watch`: watch(source, cb, [options])
1. 参数 `source`: 可以是表达式或者函数, 用于指定监听的依赖对象
2. 参数 `cb`: 依赖对象变化后执行的回调函数
3. 参数 `options`: 可选参数, 可以配置的属性有`immediate`(立即触发回掉函数),`deep`(深度监听)
- 当监听`ref`类型时:
```tsx
import { defineComponent, ref, watch } from 'vue'
const WatchDemo = defineComponent({
  setup() {
    const state = ref(0)
     // 返回 stop, 停止监听
    const stopWatch = watch(state, (newValue, oldValue) => {
      console.info(`WatchRef oldValue:${oldValue}`)
      console.info(`WatchRef newValue:${newValue}`)
    })

    setInterval(() => {
      state.value++
      if (state.value > 5) {
        stopWatch()
      }
    }, 1000)

    return () => (
      <>
        <p>{state.value}</p>
      </>
    )
  },
})
export default WatchDemo
```

- 当监听`reactive`类型时:
```tsx
import { defineComponent, reactive, watch } from 'vue'
// import { ElMessage } from 'element-plus'

const WatchReactive = defineComponent({
  setup() {
    const state = reactive({ count: 0 })
    watch(
      () => state.count, // 某个属性
      (newValue, oldValue) => {
        console.info(`WatchReactive oldValue:${oldValue}`)
        console.info(`WatchReactive newValue:${newValue}`)
      }
    )

    setTimeout(() => {
      state.count++
    }, 5000)

    return () => (
      <>
        <p>{state.count}</p>
      </>
    )
  },
})

export default WatchReactive

```

- 当同时监听多个值时
```tsx
import { defineComponent, reactive, watch } from 'vue'
const WatchReactive = defineComponent({
  setup() {
    const state = reactive({ count: 0, name: 'leslie' })
    watch(
      [() => state.count, () => state.name], // 监听多个属性, 数组格式
      // 回调参数的格式 数组格式: [newVal1,newVal2], [oldVal1,oldVal2]
      ([newCount, newName], [oldCount, oldName]) => {
        console.info(`WatchMultiple old count:${oldCount}`)
        console.info(`WatchMultiple new count:${newCount}`)
        console.info(`WatchMultiple old name:${oldName}`)
        console.info(`WatchMultiple new name:${newName}`)
      }
    )
    setTimeout(() => {
      state.count++
      state.name = state.count + 's'
    }, 5000)

    return () => (
      <>
        <p>{state.count}</p>
        <p>{state.name}</p>
      </>
    )
  },
})
export default WatchReactive
```
- 因为 `watch` 方法的第一个参数我们已经指定了监听的对象, 因此当组件初始化时, 不会执行第二个参数中的回调函数, 若我们想让其初始化时就先执行一遍, 可以在第三个参数对象中设置 `immediate: true`
- `watch` 方法默认是渐层的监听我们指定的数据, 例如如果监听的数据有多层嵌套, 深层的数据变化不会触发监听的回调, 若我们想要其对深层数据也进行监听, 可以在第三个参数对象中设置 `deep: true`
- `watch` 方法会返回一个 `stop` 方法, 若想要停止监听, 便可直接执行该 `stop` 函数


### watchEffect
1. 不需要手动传入依赖
2. 每次初始化时会执行一次回调函数来自动获取依赖
3. 无法获取到原值, 只能得到变化后的值
```tsx
import { stat } from 'fs/promises'
import { defineComponent, watchEffect, reactive } from 'vue'

const WatchEffectDemo = defineComponent({
  setup() {
    const state = reactive({ count: 0, name: 'leslie' })

    watchEffect(() => {
      console.info(state.count)
      console.info(state.name)
      /**
       * 初始化打印: 0, 0-name
       * 1秒后打印:  1, 1-name
       */
    })

    setTimeout(() => {
      state.count++
      state.name = state.count + '-name'
    }, 1000)

    return () => (
      <>
        <p>{state.count}</p>
        <p>{state.name}</p>
      </>
    )
  },
})

export default WatchEffectDemo
```
- 我们并没有像 `watch` 方法一样先给其传入一个依赖, 而是直接指定了一个回调函数
- 当组件初始化时, 将该回调函数执行一次, 自动获取到需要检测的数据是 `state.count` 和 `state.name`
- <font color="#FF0000">自动获取到需要检测的数据</font>