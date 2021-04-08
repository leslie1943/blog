### Vue: 路由守卫 Router Guards

#### 全局前置守卫
- 
- 1. to: Route: 即将要进入的目标 路由对象
- 2. from: Route: 当前导航正要离开的路由
- 3. next: Function: 一定要调用该方法来 resolve 这个钩子.执行效果依赖 next 方法的调用参数

### #全局后置钩子
- `router.afterEach`
- 1. to: Route: 即将要进入的目标 路由对象
- 2. from: Route: 当前导航正要离开的路由


### 组件内的守卫
- `beforeRouteEnter`
- 1. 在渲染该组件的对应路由被 confirm 前调用
- 2. 不！能！获取组件实例 `this`
- 3. 因为当守卫执行前, 组件实例还没被创建
- `beforeRouteUpdate`
- 1. 在当前路由改变, 但是该组件被复用时调用
- 2. 举例来说, 对于一个带有动态参数的路径 /foo/:id, 在 /foo/1 和 /foo/2 之间跳转的时候, 
- 3. 由于会渲染同样的 Foo 组件, 因此组件实例会被复用.而这个钩子就会在这个情况下被调用.
- 4. 可以访问组件实例 `this`
- `beforeRouteLeave`
- 1. 导航离开该组件的对应路由时调用
- 2. 可以访问组件实例 `this`