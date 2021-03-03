#### Hooks: what for
- 对函数行组件进行增强, 让函数行组件可以存储状态,可以拥有处理副作用的能力.
- 让开发者在不使用类组件的情况下, 实现相同的功能
- `副作用`: 只要不是把数据转换成视图的代码就属于副作用, `获取DOM元素`,`设置定时器`,`发送Ajax请求` 都属于副作用,在类组件中通常使用`生命周期函数`处理`副作用`


#### 类组件的不足(Hooks)要解决的问题
1. 缺少逻辑复用的机制: 为了复用逻辑增加无实际渲染效果的组件, 增加了组件层级, 显示十分臃肿, 增加了调试难度及运行效率的降低
2. 类组件经常变得很复杂难以维护: 将一组相关的业务逻辑拆分到多个生命周期函数中, 将一个生命周期函数内存在多个不相干的业务逻辑
3. 类成员方法不能保证`this`指向的正确性

#### 常见的 hooks
- `userState()`, `useEffects()`,`useReducer()`, `useRef()`,`useCallback()`,`useContext()`,`useMemo()`

#### ⭐ userState()
- 使用`userState()`让函数组件可以保存状态
- 接收唯一的参数即状态初始值, 初始值可以是任意数据类型
- 返回值为数组, 数组中存储状态值和更改状态值的方法,方法的名称约定以set开头, 后面加上状态名称.
- 方法可以被调用多次, 用以保存不同状态值
- 参数可以是一个函数,函数返回什么, 初始状态就是什么, 函数只会被调用一次, 用在初始值是动态值的情况
```js
function App(props){
    // const propsCount = props.count || 0  // ❌
    // const [count, setCount] = useState(propsCount) // ❌这样写有问题的, 因为每次更新都会执行一次这个语句

    // 使用函数的方法, 验证第4点
    const [count, setCount] = useState(() => {
        return props.count || 0 // 只执行一次.
    })
    const [person, setPerson] = useState({name:'zhangsan', age:20 })
    render(){
        <div>
            <button onClick={() => setCount(count + 1)}>Change Person </button>
            <button onClick={() => setPerson({...person, name: 'lisi'})}>Change Person </button>
        </div>
    }
}
```
- 设置状态值的参数可以是一个值也可以是一个函数
- 设置状态值的方法本身是异步的.
```js
import React, { useState } from 'react'
type CounterProp = {
  initialCount: number
}
function CounterState(props: CounterProp) {
  const [count, setCount] = useState(()=>{
      return props.initialCount
  })
  function handleAddCount() {
    setCount((count) => {
        // 设置状态值的方法本身是异步的
      const newCount = count + 1
      // 如果执行结果依赖于最新的状态, 要放在回调函数中去执行.
      document.title = newCount + ''
      return newCount
    })
  }
  return (
    <div>
      UseStateCount: {count}
      {/* 传递一个函数 */}
      <button onClick={handleAddCount}> + </button>
    </div>
  )
}
```

#### ⭐ useReducer()
- 使用`useReducer()`让函数组件可以保存状态
```js
import React, { useReducer } from 'react'
interface State {
  count: number
}
type Action = { type: 'reset' } | { type: 'increment' } | { type: 'decrement' }

function countReducerFn(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      throw state
  }
}
// 函数组件的 props 的约束
interface CounterProps {
  initialCount: number
}

function Counter({ initialCount }: CounterProps) {
  // React.userReducer 返回 state 和 dispatch
  const [state, dispatch] = useReducer(countReducerFn, {
    count: initialCount,
  })
  return (
    <div>
      useReducer for count: {state.count}
      {/* dispatch后根据执行的type会触发 reducer函数的执行 */}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}

export default Counter

```
- `好处`: 比如`Counter`这个组件,它的某一个子组件,想要去改变这个counter, 我们就不需要传递多个修改数据的方法了, 我们可以把 `dispatch`传递给子组件, 让子组件执行`dispatch({type:'xxxxx'})` 通过 `reducer`函数去更新 `state` 的值


#### ⭐ useContext()
- 在`跨层级组件`获取数据时`简化`获取数据的代码

| 简化前 | 简化后 |
| ---- | ----- |
|  首先使用 `createContext`创建一个 `context` |  首先使用 `createContext`创建一个 `context` |
| 然后在父组件中使用 `<countContext.Provider>` 向下传递状态 | 然后在父组件中使用 `<countContext.Provider>` 向下传递状态 |
| 最后在子组件中使用 `<countContext.Consumer>` 和 回调函数获取传递的状态 | 最后在子组件中使用 `useContext` 获取到创建的 `context` |

#### ⭐ useEffect()
- 让函数型组件拥有处理副作用的能. 类似生命周期函数.
- 一、 `执行时机`:可以把 `useEffect`看成是`componentDidMount`,`componentDidUpdate` 和 `componentWillUnmount`这3个生命周期的组合
- `useEffect(() => {})`: => `componentDidMount`,`componentDidUpdate`
- `useEffect(() => {}, [])` => `componentDidMount`: 只执行一次
- `useEffect(() => () => {})` => `componentWillUnmount`: 组件卸载的时候执行, 返回的函数执行清理操作

- 二、`解决的问题`: (1)按照用途将代码进行分类(将一组相干的业务逻辑归置到同一个副作用函数中);(2)简化重复代码, 是组件内部的代码更加清晰(在两个生命周期做的事情,现在在一个`useEffect`中就能完成)

#### ⭐ useEffect() 的第二个参数
- 只有指定的数据发生改变的时候才触发`effect`
```js
import React, { useEffect, useState } from 'react'

export default function UseEffecParams() {
  const [count, setCount] = useState(0)
  const [person, setPerson] = useState({ name: 'leslie' })

  useEffect(() => {
    console.info('执行了useEffect')
    document.title = count + ''
  }, [count]) // 只有 count 属性发生了变化 才会执行 useEffect

  return (
    <div>
      <section>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>Add</button>
      </section>
      <section>
        <span>{person.name}</span>
        <button onClick={() => setPerson({ name: 'xxxx' })}>
          Change person
        </button>
      </section>
    </div>
  )
}
```

#### ⭐ useEffect()中的异步方法
```js
import React, { useEffect } from 'react'

export default function UseEffecAsync() {
  /**
   * ❌❌❌ 这种异步的方式是不被允许的,原因是这种方式会返回一个Promise对象,改变了useEffect回调函数的本质
    useEffect(async () => {
      const result = await getData()
    }, [])
   */

  //  ✅✅✅ 异步方式-1
  useEffect(() => {
    // 定义异步方法 再调用的方式
    async function fetchData() {
      const response = await getData()
      console.info('response', response)
    }
    fetchData()
  }, [])

  //  ✅✅✅ 异步方式-2
  useEffect(() => {
    // 自执行函数
    ;(async () => {
      const result = await getData()
      console.info('result', result)
    })()
  }, [])
  return (
    <div>
      <section>UseEffct demo</section>
    </div>
  )
}

function getData() {
  return new Promise((resolve) => {
    resolve({ msg: 'Hello' })
  })
}
```

#### ⭐ useMemo()
- `useMemo`的行为类似于`Vue`中的计算属性, 可以监测某个值的变化, 根据变化值重新计算新值
- `useMemo`会缓存计算结果, 如果监测值没有发生变化, 即时组件重新渲染, 也不会重新计算, 此行为课可以有助于避免再每个渲染上进行昂贵的计算
```js
  // 第一个参数: 回调函数,返回新值
  // 第二个参数: 监测的属性
  const another_state = useMemo(() => {
    return depend_state * 2
  },[depend_state])
```

#### ⭐ memo
- 性能优化: 如果本组件中的数据没有发生变化, 阻止组件更新, 类似类组件中的`PureComponent`和`shuoldComponentUpdate`
```js
import React, { useState, memo } from 'react'
export default function MemoDemo() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}> + </button>
      <Foo />
    </div>
  )
}

const Foo = memo(function Foo() {
  console.info('Foo 组件重新渲染了')
  return <div>我是Foo组件</div>
})

```

#### ⭐ useCallback
- 性能优化, 缓存函数, 使组件重新渲染时得到相同的函数实例.
```js
import React, { useState, memo, useCallback } from 'react'
export default function UseCallback() {
  const [count, setCount] = useState(0)
  // 如果setCount不发生变化, 通过 useCallback 每次渲染都会得到同样的resetCount实例
  // 当组件重新渲染的时候, setCount是不会发生改变的.
  const resetCount = useCallback(() => setCount(0), [setCount])
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}> + </button>
      {/* 点击count+1的时候,页面会重新渲染, 当页面重新渲染的时候, resetCount和之前的resetCount就不是一个实例了, 
      所以即使使用 memo 包裹Foo组件, Foo组件因为 resetCount实例的变化会被重新执行 */}
      <Foo resetCount={resetCount} />
    </div>
  )
}

interface FooProps {
  resetCount: () => void
}
const Foo = memo(function Foo(props: FooProps) {
  console.info('Foo 组件重新渲染了')
  return (
    <div>
      <p>我是Foo组件</p>
      <p>
        <button onClick={props.resetCount}>reset count</button>
      </p>
    </div>
  )
})

```

#### ⭐ useRef
- 获取DOM元素对象
- 保存数据(跨组件周期)
- 即使组件重新渲染, 保存的数据仍然存在,保存的数据被更改不会触发组件的重新渲染.
- `useRef`保存的数据不会触发页面的重新渲染.

#### ⭐ 自定义 Hook
- 自定义 Hook 是标准的封装和共享逻辑的方式
- 自定义 Hook 是一个函数, 其名称以 `use`开头
- 自定义 Hook 其实就是逻辑和内置 Hook 的组合
```js
// 假如页面上有一个表单, 有很多表单项
// 每个Input表单项都会绑定 value 和 onChange 事件
// 我们就可以把这些重复的操作提取成自定义Hook

// ------------- 定义自定义Hook 函数
import { useState } from 'react'

export function useUpdateInput(initialValue: string | number | undefined) {
  const [value, setValue] = useState(initialValue)
  return { value, onChange: (event: Event) => setValue(event.target.value) }
}

// ------------- 使用自定义Hook 函数
import React from 'react'
import { Button } from 'antd'

export default function HooksCustomDemo() {
  // 调用自定义 hook
  // 多次调用返回不同的对象
  const usernameInput = useUpdateInput('suzhen')
  const passworInput = useUpdateInput('1234')

  const submitForm = () => {
    console.info('usernameInput', usernameInput.value)
    console.info('passworInput', passworInput.value)
  }
  return (
    <div style={{ margin: 50 }}>
        <form>
          <input type="text" name="uername" {...usernameInput} />
          <input type="password" name="password" {...passworInput} />
          <Button onClick={submitForm}>提交</Button>
        </form>
    </div>
  )
}
```

#### ⭐ 路由钩子函数
- `useHistory`,`useLocation`,`useRouteMatch`,`useParams`
- 来自于`react-router-dom`模块