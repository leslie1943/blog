## Vue: 为什么Vue的虚拟DOM比React虚拟DOM性能好

### 虚拟 Dom - Diff
- `Vue` 和 `React` 都采用了`虚拟dom`算法, 以最小化更新真实DOM, 从而减小不必要的性能损耗.
- 按颗粒度分为 `tree diff`, `component diff`, `element diff`. 
- 1. tree diff 比较同层级dom节点, 进行增、删、移操作.
- 2. 如果遇到component,  就会重新tree diff流程.


### 更新策略不同
- `React 会自顶向下全 Diff` |||| `Vue 会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树.`
- 1. 在 `React` 中, 当状态发生改变时, 组件树就会自顶向下的全 `diff`, 重新 `render` 页面,  重新生成新的`虚拟dom tree`, `新旧dom tree`进行比较,  进行patch打补丁方式, 局部跟新dom. 所以 `React` 为了避免父组件跟新而引起不必要的子组件更新,  可以在 `shouldComponentUpdate` 做逻辑判断, 减少没必要的render,  以及重新生成虚拟dom, 做差量对比过程.
- 2. 在 vue中,  通过` Object.defineProperty` 把这些 data 属性 全部转为 `getter/setter`. 同时 `watcher` 实例对象会在组件渲染时, 将属性记录为 `依赖项 dep`, 当 `依赖项 de` 项中的 `setter` 被调用时, 通知watch重新计算, 使得关联组件更新.
- Diff 算法借助元素的 Key 判断元素是新增、删除、修改，从而减少不必要的元素重渲染。
