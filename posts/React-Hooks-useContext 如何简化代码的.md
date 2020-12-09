## React: Hooks-useContext 如何简化代码的?

#### 简化前实现
- 首先使用 `createContext`创建一个 `context`
- 然后在父组件中使用 `<countContext.Provider>` 向下传递状态
- 最后在子组件中使用 `<countContext.Consumer>` 和 回调函数获取传递的状态
```js
import React, { createContext } from 'react'

interface ContextProps {
  counter: number
  name: string
}
// 定义 Context
const countContext = createContext<ContextProps>({ counter: 0, name: '' })
export default function UseContextDemo() {
  return (
    //   通过 countContext.Provider 传递 context
    <countContext.Provider value={{ counter: 100, name: 'leslie' }}>
      <Foo />
    </countContext.Provider>
  )
}
// 使用 <countContext.Consumer> 
function Foo() {
  return (
    <countContext.Consumer>
      {(context) => {
        return (
          <div>
            <p>context.counter: {context.counter}</p>
            <p>context.name: {context.name}</p>
          </div>
        )
      }}
    </countContext.Consumer>
  )
}
```

#### 简化后实现
- 首先使用 `createContext`创建一个 `context`
- 然后在父组件中使用 `<countContext.Provider>` 向下传递状态
- 最后在子组件中使用 `useContext` 获取到创建的 `context`
```js
import React, { createContext, useContext } from 'react'

interface ContextProps {
  counter: number
  name: string
}
// 定义 Context
const countContext = createContext<ContextProps>({ counter: 0, name: '' })
export default function UseContextDemo() {
  return (
    //   通过 countContext.Provider 传递 context
    <countContext.Provider value={{ counter: 100, name: 'leslie' }}>
      <Foo />
    </countContext.Provider>
  )
}

function Foo() {
  const context = useContext(countContext) // ✅✅ 看这里
  return (
    <div>
      <p>context.counter: {context.counter}</p>
      <p>context.name: {context.name}</p>
    </div>
  )
}
```