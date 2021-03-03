## React: Hooks为什么不能放在条件判断中
- 以 `setState` 为例, 在 `react` 内部, 每个组件(`Fiber`)的 `hooks` 都是以链表的形式存在 `memoizeState` 属性中：
- `update` 阶段, 每次调用 `setState`, 链表就会执行 `next` 向后移动一步.如果将 `setState` 写在条件判断中, 假设条件判断不成立, 没有执行里面的 `setState` 方法, 会导致接下来所有的 `setState` 的取值出现偏移, 从而导致异常发生.

<img src="./../images/mds/react-hook.png">