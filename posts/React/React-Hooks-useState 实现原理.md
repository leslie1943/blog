#### useState 实现原理
```js
// ----------------------------- 自定义实现 useState -----------------------------
let state: Array<any> = [] // 一组状态
let setters: Array<any> = [] // 一组操作状态的函数
let stateIndex = 0 // 当前 状态的 下标

// 创建对应的 setXXX 函数: 闭包的形式
function createSetter(index: number) {
  return function (newState: any) {
    state[index] = newState // index 闭包
    render() // 更新状态后重写渲染组件
  }
}

// 函数入口
export function useState(initialState: any) {
  // 初始值: 重新渲染时保持值
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState

  // 添加对应的处理函数
  setters.push(createSetter(stateIndex))
  let value = state[stateIndex] // 当前状态值
  let setter = setters[stateIndex] // 处理当前值的方法
  stateIndex++
  // 成对返回
  return [value, setter]
}

// 重新渲染时归0
function render() {
  stateIndex = 0 // 否则从最后一个下标开始计数
  ReactDOM.render(<Component />, document.getElementById('hooks-imp'))
}
```