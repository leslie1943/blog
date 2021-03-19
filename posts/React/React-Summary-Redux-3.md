#### Redux 中间件
- 中间件允许我们扩展 redux 应用程序
- 中间件本质上就是一个函数:


#### Redux 加入了 中间件后的工作流程
-  组件触发 `action` 后, `store` 先将 `action` 交给 `中间件` 处理,然后再将 `action` 传递给 `reducer` 函数
  
<img src="./demos/redux-middleware-flow.png">

- 模板代码
```js
export default store => next => action => { }
```


#### Redux-thunk
- 允许在中间件 `middleware` 程序中加入异步代码
- `npm install redux-thunk`
- `import thunk from 'redux-thunk'`
- `export const store = createStore(rootReducer, applyMiddleware(thunk))`
```js
// 中间件-异步
const loadPosts = () => async dispatch => {
    // 异步代码
    const posts = await axios.get('/api/post').then(res => res.data)
    // 使用 dispatch 执行 action, 
    // 保存异步执行的结果
    dispatch({type: 'POST_LOADED', payload: posts})
}
```

#### Redux-saga
- `redux-saga`允许将异步代码抽离

#### Redux-saga 使用步骤
1. 在`store 或 reducers`文件下引入方法`createSagaMiddleware`
2. 通过调用`createSagaMiddleware`方法创建`sagaMiddleware`这个中间件
3. 将得到`sagaMiddleware`注册到 `store`
```js
import createSagaMiddleware from 'redux-saga' // step 1
const sagaMiddleware = createSagaMiddleware() // step 2
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware)) // step 3
```
4. 创建`sagas`文件夹
5. 创建`counter.saga.ts`, 内部代码如下
```js
// 从 redux-saga/effects 引入 takeEvery,put,delay方法
import { takeEvery, put, delay } from 'redux-saga/effects'
// takeEvery 接收 action
// put 触发 action

// 要求默认导出一个 generator 函数
export default function* counterSaga() {
  // takeEvery的第一个参数 接收 action 的 字符串
  // takeEvery的第二个参数 接收的那个字符串后要执行的异步方法
  yield takeEvery(INCREMENT_ASYNC, increment_async_fn)
}

// 要执行的异步方法
function* increment_async_fn() {
  yield delay(2000)
  yield put(add(15)) // 调用同步方法
}
```
6. 当这些准备好之后, 在`store 或 reducers`的`index.ts`文件中引入定义的`counter.saga`文件
7. 调用 `sagaMiddleware.run(counterSaga)` 启用这个`saga`文件
```js
import counterSaga from './sagas/counter.saga'
// 启动counterSaga
sagaMiddleware.run(counterSaga)
```
8. 组件触发异步`action` 会被`sagaMiddleware`捕获到
9. 然后执行`takeEvery(TYPE)`.
10. 触发异步方法(后台接口)执行,将结果传递给下一步
11. 然后执行`put(add(result))`同步方法,完成`state`的更新

#### Saga 中 action 传参
1. 组件中点击按钮触发 `onClick={() => this.props.increment_async(20)}`
2. 在定义这个`increment_async` `action creator` 函数的时候传递一个形参
3. 触发这个 `action` 的时候被`saga`接收了
4. `saga`接收之后运行了一个方法, 这个方法有个形参`action`, 可以通过`action.payload`拿到这个参数
5. `saga`中`put`又触发了`action`将参数传递给同步 `action`
6. 触发的同步 `action` 被 `reducer` 接收，完成状态更新

`biz component` === >>>> `Async Action` === >>>> `Saga` === >>>> `takeEvery()` === >>>> `put()` === >>>> `Sync Action` === >>>> `reducers`

#### Saga 的文件拆分
1. 分别按照模块拆分不同的小的 `saga` 文件.
2. 然后通过`all`方法合并成一个总的 `rootSaga` 文件,导出一个`generator`方法
```js
import { all } from 'redux-saga/effects'
import counterSaga from './counter.saga'
import modalSaga from './modal.saga'

export default function* rootSaga() {
  yield all([counterSaga(), modalSaga()]) // 函数的调用
}
```
3. 在 `reducers`中导入`rootSaga`, 启用合并的`saga`
```js
import rootSaga from './sagas/root.saga'
// 启动 合并的 saga
sagaMiddleware.run(rootSaga)
```