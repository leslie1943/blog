### Vue: Vue3中配置Vuex中State支持TS
- [官网文档](https://next.vuex.vuejs.org/guide/typescript-support.html)

### 步骤 steps
1. 💛 Define the typed `InjectionKey`
2. 💛 Provide the typed `InjectionKey` when installing a store to the Vue app
3. 💛 Pass the typed `InjectionKey` to the `useStore` method

### 🛴 Step-1 Define the typed `InjectionKey` && Step-3  Pass the typed `InjectionKey` to the `useStore` method
- `src/store/index.ts`
```ts
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue' // 🎃

interface User {
  name?: string
  age?: number
  company?: string
}

// 声明 State 类型
export interface State {
  count: number
  user: User
}

// 🎃 define injection key
export const key: InjectionKey<Store<State>> = Symbol() // 🎃

// 创建 vuex 容器
export const store = createStore<State>({
  state: {
    count: 0,
    user: {}
  }
})

// 🎃 define own `useStore` composition function: 定义自己的 useStore 这是第三步
export function useStore() {
  return baseUseStore(key)
}
```

### 🛴 Step-2 Provide the typed `InjectionKey` when installing a store to the Vue app
- `src/main.ts`
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store' // 导入 store 和 key

createApp(App)
  .use(store, key) // 🎃 传入 key
  .use(router)
  .mount('#app')
```

### 🛴 use
```ts
// import { useStore } from 'vuex' // 
import { useStore } from '@/store' // 从 store 里导出加强版的 useStore,无需传递 key

export const useLogin = () => {
  /**
   * store
   */
  const store = useStore()
  store.state.count = 1
  // store.state.user.age // 自动识别 store.state.user 和 state.state.count

  return { user, handleSubmit, errors, isLoading }
}
```