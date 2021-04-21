### Vue: Vue3中常用的API - 14 - useStore
- 在 `Vue2` 中使用 `Vuex`, 我们都是通过 `this.$store` 来与获取到 `Vuex` 实例, 但上一部分说了原本 `Vue2` 中的 `this` 的获取方式不一样了, 并且我们在 `Vue3` 的 `getCurrentInstance().ctx` 中也没有发现 `$store` 这个属性, 那么如何获取到 `Vuex` 实例呢? 这就要通过 `vuex` 中的一个方法了, 即 `useStore`
```js
import { createStore } from 'vuex'

export default createStore({
  state: { listData: { 1: 10 }, num: 10 },
  mutations: {
    setData(state, value) {
      state.listData = value
    },
    addNum(state) {
      state.num += 10
    },
  },
  actions: {
    setData(context, value) {
      context.commit('setData', value)
    },
  },
  modules: {},
})
```
- 使用
```tsx
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

const UseStroeDemo = defineComponent({
  setup() {
    const store = useStore()
    console.info(store)

    return () => (
      <>
        <p>{JSON.stringify(store)}</p>
        <p>store.state.num: {store.state.num}</p>
      </>
    )
  },
})

export default UseStroeDemo

```

#### store 打印结果
- commit: ƒ boundCommit(type, payload, options2)
- dispatch: ƒ boundDispatch(type, payload)
- getters: {}
- strict: false
- _actionSubscribers: []
- _actions: {setData: Array(1)}
- _committing: false
- _makeLocalGettersCache: {}
- _modules: ModuleCollection2 {root: Module2}
- _modulesNamespaceMap: {}
- _mutations: {setData: Array(1), addNum: Array(1)}
- _state: Proxy {data: {…}}
- _subscribers: []
- _wrappedGetters: {}
- state: Proxy
- [[Handler]]: Object
- [[Target]]: Object
- listData: {1: 10}
- num: 10
- __proto__: Object
- [[IsRevoked]]: false
- __proto__: Object