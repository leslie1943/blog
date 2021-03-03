## redux 手动实现

#### redux 核心方法: createStore
```js
/**
 * @param {*} reducer: 处理某个 store state 属性的 方法
 * @param {*} preloadedState: state 的默认值
 */
function createStore(reducer, preloadedState) {
  // store 对象中存储的 state
  var currentState = preloadedState;

  // 存放订阅者
  var currentListeners = [];

   /**
   * 通过闭包的形式获取 state
   */
  function getState() {
    return currentState;
  }

   /**
   * 
   * @param {*} action 执行的动作类型
   * 1.触发 action
   * 2.执行 reducer 具体的函数
   * 3.函数中通过 action.type 返回最新的 state
   * 4.获取 state 后, 执行订阅者函数.
   */
  function dispatch(action) {
    // reducer函数返回新的state
    currentState = reducer(currentState, action);
    // 循环数组, 通知订阅者, 执行订阅回调函数
    for (var i = 0; i < currentListeners.length; i++) {
      // 获取订阅者
      var listener = currentListeners[i];
      // 调用订阅者
      listener();
    }
  }
  // 订阅状态, 添加订阅者
  function subscribe(listener) {
    currentListeners.push(listener);
  }

// 导出属性, 供外部调用
  return {
    getState,
    dispatch,
    subscribe,
  };
}
```

## 工作流程
1. 获取 `store`: `var store = createStore(reducer, 0)`
2. 订阅 `store`:  `store.subscribe(()=> store.getState())`
3. 触发 `dispatch({ type: 'increment' })`
4. `dispatch`接收`action`, 执行`reducer(reducer(currentState, action))`函数
5. `reducer函数`根据`action.type`处理`state`并返回.
6. 执行`订阅者`回调函数