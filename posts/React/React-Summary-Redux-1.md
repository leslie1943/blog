#### Redux-actions
```bash
  # yarn add redux-actions
  # yarn add @types/redux-actions
```

```js
import { createAction } from 'redux-actions'

/*
increment 这个字符串就是 action里对应的 type 属性值
createAction 的返回值 就是 我们之前定义的 action creator 函数
*/
const increment_action = createAction('increment') // 自动接收组件触发时的参数
const decrement_action = createAction('decrement')
```


#### 创建 reducer
```js
import { handleActions as createReducer } from 'redux-actions'
import { increment_action, decrement_action } from '../actions/counter.action'

const initialState = { count: 0 }
const counterReducer = createReducer({
  [increment_action]: (state, action) => ({ count: state.count + action.payload}),
  [decrement_action]: (state, action) => ({ count: state.count - action.payload}),
}, initialState)

export default counterReducer
```


##  Redux + saga + redux-actions
## 1. 🚀 `define actions`
## 2. 🚀 `bind actions in biz component` - connect(mapStateToProp, maoDispatchToProp)
## 3. 🚀 `emit actions in biz component`
## 4. 🚀 `saga accepts and emit async action `
## 5. 🚀 `reducer accepts sync action from saga`
## 6. 🚀 `return new state from reducer`