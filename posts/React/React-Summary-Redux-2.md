## Redux使用心得


#### 💛💛 reducer 定义阶段 💛💛
- 1.1: 定义常量: 被 约束Action的interface使用,其目的是规定 action的结构
- 1.2: 定义常量: 被 reducer 函数使用, 根据 action.type 处理逻辑, (由于Action结构被约束过, 一定存在type属性,且value就是定义的常量之一)
- 2:   定义Action interface (IAction), 用来约束 action 的结构
- 3:   定义 action:IAction 来约束
- 4.1: 定义 <ModuleState> 结构, 用于 reducer 函数返回值类型的约束
- 4.2: 定义 <ModuleState> 结构, 用于导出被全局 RootState 使用
```js
    interface RootState {
    model_a: StateA
    model_b: StateB
    }
```
- 5.1: 定义 reducer 函数, 传入初始 state, 传入 action, 定义返回数据类型 <ModuleState>
- 5.2: 根据传入的 action, 处理 reducer 函数逻辑, 完成 state 更新

#### 💛💛 业务组件阶段 💛💛

- 6:   在组件中定义 Props, 用来约束组件接受的 Props 数据结构
- 7:   定义 mapStateToProps 函数, 将 全局 Store下的 state 映射出来
```js
// 左侧属性可以自定义: 右侧的属性是 module下的
    const mapStateToProps = (state: RootState) => {
        return {
            fontSize: state.config.fontSize,
            color: state.config.color,
            name: state.calulate.name,
            age: state.calulate.age,
        }
    }
```
- 8:  定义 mapDispatchToProps, 将 action 映射出来
```js
// 使用 dispatch来触发 action 可以影响到 reducer 模块下对应的函数,进而更新 模块下的 state
    const mapDispatchToProps = (dispath: Dispatch) => ({
        toLight: () => dispath(lightAction),
        toDark: () => dispath(darkAction),
    })
```
- 9: connect 绑定 并 导出=> 注入到组件的props
```js
    export default connect(mapStateToProps, mapDispatchToProps)(CounterSimple)
```

#### combineReducers

- `src/reducers/index.ts`
```ts
import { createStore, combineReducers, Dispatch } from 'redux'
import { calculate, CalculateState } from './calculate'
import { config, ConfigState } from './config'

export interface RootState {
  calculate: CalculateState
  config: ConfigState
}

// 全局可以创建多个 reducer 在这里统一在一起
const rootReducer = combineReducers({ calculate, config })

/***
 * 🔯🔯🔯🔯 Redux Step-1: 通过 createStore 完成 store 对象的创建
 * # 语法:
 * createStore({reducer,initial_state, applyMiddleware})
 */
export const store = createStore(rootReducer)

// Dispatch 的 类型别名
export type ReduxDispatch = Dispatch

```

- `src/components/biz.tsx`
```tsx
import React from 'react'
import { darkAction, lightAction } from '../reducers/config'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from '../reducers/index'

interface Props {
  color: string
  fontSize: number
  toLight: () => any
  toDark: () => any
}

class CounterSimple extends React.Component<Props, any> {
  render() {
    const btnStyle = {
      marginRight: 10,
    }
    const divStyle = {
      padding: 100,
      backgroundColor: this.props.color,
      fontSize: this.props.fontSize,
    }
    return (
      <div style={divStyle}>
        <button style={btnStyle} onClick={this.props.toLight}>
          To Light
        </button>
        <button style={btnStyle} onClick={this.props.toDark}>
          To Dark
        </button>
        <p>{this.props.color}</p>
        <p>{this.props.fontSize}</p>
      </div>
    )
  }
}

// 将 state 映射到 组件的 props
// 左侧属性可以自定义: 右侧的属性是 module下的
const mapStateToProps = (state: RootState) => {
  return {
    fontSize: state.config.fontSize,
    color: state.config.color,
  }
}

// 将 action 映射到 组件的 props
// 使用 dispatch来触发 action 可以影响到 reducer 模块下对应的函数,进而更新 模块下的 state
const mapDispatchToProps = (dispath: Dispatch) => ({
  toLight: () => dispath(lightAction),
  toDark: () => dispath(darkAction),
})

// 注入到组件的props
export default connect(mapStateToProps, mapDispatchToProps)(CounterSimple)

```

- `src/index.js`
```js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

// below 2 import sentences for Redux
// Provider 就是把 redux 创建出来的store放置在一个全局可触碰的地方
import { Provider } from 'react-redux' // 
import { store } from './reducers' // 引入全局的reducers(store: 单一数据源)

ReactDOM.render(
  // 通过 Provider 组件 将 store 放到了全局的组件可以访问到的地方
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

```


#### Redux core concepts
- 1- 组件通过 dispatch 方法 触发 action
- 2- Store 接收 action 并将 Action 分发给 reducer
- 3- Reducer 根据 Action 的类型对状态进行更改并将更改后的状态返回给 Store
- 4- 组件订阅 Store 中的状态, Store中状态更新会同步到组件

#### React-redux
```js
import { connect } from 'react-redux'

// 将 state 映射到 组件的 props
// 左侧属性可以自定义: 右侧的属性是 module下的
const mapStateToProps = (state: RootState) => {
  return {
    num: state.calculate.num,
    color: state.calculate.color,
  }
}
// 💛💛💛 >>>>>>>>>>>>>>>>>>>  使用 常规方式 将 action 映射到 props
const mapDispatchToProps = (dispath: Dispatch) => ({
  increment: () => dispath(incrementAction),
  decrement: () => dispath(reduceAction),
})
```


#### bindActionCreators
```js
// 💛💛💛 >>>>>>>>>>>>>>>>>>> 使用 bindActionCreators 将 action 映射到 props
// 前提是集中定义actions
import { INCREMENT, DECREMENT } from '../count'
export const add = () => ({ type: INCREMENT })
export const reduce = () => ({ type: DECREMENT })


// 引入定义的actions, 传递给 bindActionCreators
import * as counterActions from '../../reducers/actions/counter'
const mapDispatchToProps = (dispatch: ReduxDispatch) => bindActionCreators(counterActions,dispatch)

// 💛💛💛 >>>>>>>>>>>>>>>>>>> 使用 bindActionCreators 和 常规方式 将 action 映射到 props
// 前提是集中定义actions
import { INCREMENT, DECREMENT } from '../count'
export const add = () => ({ type: INCREMENT })
export const reduce = () => ({ type: DECREMENT })

// 引入定义的actions, 传递给 bindActionCreators
import * as counterActions from '../../reducers/actions/counter'
const mapDispatchToProps = (dispatch: ReduxDispatch) => ({
  add: () => dispatch(incrementAction),
  reduce: () => dispatch(decrementAction),
  ...bindActionCreators(counterActions, dispatch),
})

// 注入到组件的props
// connect的作用(1): 订阅 store, 当 store 的状态发生变化, 会重新渲染组件
// connect的作用(2): 获取store中的状态, 将状态通过组件的 props 属性 映射给组件
// connect的作用(3): 获取 dispatch 方法 => 在组件中可以使用 props.dispatch 了
// 语法: connect()()
export default connect(mapStateToProps, mapDispatchToProps)(CounterSimple)
```

#### action 接收参数 in TypeScript
- 1- 在`Action`接口约束中添加参数
```js
export interface Action {
  type: typeof INCREMENT | typeof DECREMENT
  payload: number // 🧡
}
```
- 2 在 具体的 action 中添加 payload形参, 返回体中添加属性
```js
import { INCREMENT, DECREMENT } from '../count'
export const add = (payload: number) /* 🧡 */ => ({ type: INCREMENT, payload })
export const reduce = (payload: number) /* 🧡 */ => ({ type: DECREMENT, payload })

```

- 3 在 `module` 的 `reducer` 中 处理 `payload`
```js
const counter = (
  state: CountState = { count: 0 },
  action: Action
): CountState => {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + (action.payload ? action.payload : 0),
      }
    case DECREMENT:
      return {
        count: state.count - (action.payload ? action.payload : 0),
      }
    default:
      return state
  }
}
```