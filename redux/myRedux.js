/**
 * @param {*} reducer
 * @param {*} preloadedState
 * @param {*} enhancer: like middleware
 *
 * 中间件就是在 【 action 发出之后 】, 【 reducer 接收之前 】做一些特殊处理, 对 dispatch 进行增强
 */
function createStore(reducer, preloadedState, enhancer) {
  // 约束 reducer 参数类型
  if (typeof reducer !== 'function') {
    throw new Error('❌ reducer must be a function.')
  }
  // 判断 enhancer参数有没有传递
  if (typeof enhancer !== 'undefined') {
    // 判断 enhancer 是否是一个函数
    if (typeof enhancer !== 'function') {
      throw new Error('❌ enhancer must be a function.')
    }
    // 调用,生成加强版本的 store
    return enhancer(createStore)(reducer, preloadedState)
  }
  // store 对象中存储的状态
  var currentState = preloadedState

  // 存放订阅者
  var currentListeners = []

  /**
   *通过闭包的形式获取状态
   */
  function getState() {
    return currentState
  }
  /**
   * @param {*} action
   * 1.触发 action
   * 2.执行 reducer 具体的函数
   * 3.函数中通过 action.type 返回最新的 state
   * 4.获取 state 后, 执行订阅者函数.
   */
  function dispatch(action) {
    // 判断 action 是否是对象
    if (!isPlainObject(action)) {
      throw new Error('❌ action must be a Object.')
    }
    // 判断 action 中是否具有 type 属性
    if (typeof action.type === 'undefined') {
      throw new Error('❌ action must have type property.')
    }

    // reducer函数返回新的state
    currentState = reducer(currentState, action)
    // 循环数组, 调用订阅者
    for (var i = 0; i < currentListeners.length; i++) {
      // 获取订阅者
      var listener = currentListeners[i]
      // 调用订阅者
      listener()
    }
  }
  /**
   * 订阅状态, 添加订阅者
   * @param {*} listener
   */
  function subscribe(listener) {
    currentListeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}

// 判断是否是对象
function isPlainObject(obj) {
  // 排除基本数据类型 和 null
  if (typeof obj !== 'object' || obj === null) {
    return false
  }
  // 区分数组和对象 原型对象对比的方式
  var proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

// 中间件函数
function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      // 创建 store
      var store = createStore(reducer, preloadedState)
      // 低配的 store
      var middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch
      }
      // 调用中间件的第一层函数, 传递低配的 store 对象
      var chain = middlewares.map((middleware) => middleware(middlewareAPI))

      // 返回logger中间件
      var dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}

function compose() {
  var funcs = [...arguments]
  return function (dispatch) {
    // 倒序循环
    for (let i = funcs.length - 1; i >= 0; i--) {
      // 覆盖 dispatch
      dispatch = funcs[i](dispatch)
    }
    return dispatch
  }
}

// 集中注册 action
function bindActionCreators(actionCreators, dispatch) {
  var boundActionCreators = {}
  for (var key in actionCreators) {
    // 添加自执行函数是为了让key值保存在内存中,否则 key 是循环的最后一个
    ;(function (key) {
      boundActionCreators[key] = function () {
        dispatch(actionCreators[key]())
      }
    })(key)
  }
  // console.info('boundActionCreators', boundActionCreators)
  /**
   *  decrement: ƒ () {dispatch({type:'decrement'})}
   *  increment: ƒ () {dispatch({type:'increment'})}
   */
  return boundActionCreators
}

function combineReducers(reducers) {
  // 1. 检查 reducer 类型, 必须是函数
  var reducerKeys = Object.keys(reducers)
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]
    if (typeof reducers[key] !== 'function') {
      throw new Error('❌ reducer must be a function.')
    }
  }
  // 2. 依次调用 reducer, 将每个reducer返回的状态存储在一个大的新的对象中返回
  return function (state, action) {
    var nextState = {}
    for (var i = 0; i < reducerKeys.length; i++) {
      var key = reducerKeys[i]
      var reducer = reducers[key]
      var previousState = state[key]
      nextState[key] = reducer(previousState, action)
    }
    console.info('nextState', nextState)
    return nextState
  }
}
