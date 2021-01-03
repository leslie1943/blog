### Promise 题目 1 - 1

```js
const promise1 = new Promise((resolve, reject) => {
    console.info('promise1')
})

console.info('1', promise1)
// 1, Promise{<pending>}
```

### 过程分析
1. 从上到下, 先遇到 `new Promise`, 执行该构造函数中的代码 `promise1`
2. 然后执行同步代码 `1`, 此时 `promise1`没有被`resolve`或者`reject`,因此状态还是`pending`