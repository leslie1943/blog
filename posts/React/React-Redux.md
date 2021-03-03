#### Redux
- redux 是一个应用数据流框架，主要是解决了组件间状态共享的问题
- 原理是集中式管理，主要有三个核心方法: action，store，reducer
- 工作流程是 view 调用 store 的 dispatch 触发一个 action 传入, 
- reducer 根据action的type 进行 state 操作, 更新store
- view 通过 store 提供的 getState 获取最新的数据