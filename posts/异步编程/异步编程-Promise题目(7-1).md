### Promise 7 - 1

```js
const first = () =>
  new Promise((resolve, reject) => {
    console.log(3)

    let p = new Promise((resolve, reject) => {
      console.log(7)

      setTimeout(() => {
        console.log(5)
        resolve(6) // 状态不再发生变化
        console.log(p)
      }, 0)

      resolve(1) // p 的状态在这里被lock了
    })

    resolve(2)

    p.then((arg) => {
      console.log(arg)
    })
  })

first().then((arg) => {
  console.log(arg)
})

console.log(4)

/**
 * 3
 * 7
 * 4
 * 1
 * 2
 * 5
 * Promise:1
 *
 */
```

### 过程讲解
1. 第一段代码定义的是一个函数, 所以我们得看看它是在哪执行的, 发现它在`4`之前, 所以可以来看看`first`函数里面的内容了. 
2. 函数`first`返回的是一个`new Promise()`, 因此先执行里面的同步代码`3`
3. 接着又遇到了一个`new Promise()`, 直接执行里面的同步代码`7`
4. 执行完`7`之后, 在`p`中, 遇到了一个定时器, 先将它放到下一个宏任务队列里不管它, 接着向下走
5. 碰到了`resolve(1)`, 这里就把`p`的状态改为了`resolved`, 且返回值为`1`, 不过这里也先不执行
跳出`p`, 碰到了`resolve(2)`, 这里的`resolve(2)`, 表示的是把`first`函数返回的那个`Promise`的状态改了, 也先不管它. 
6. 然后碰到了`p.then`, 将它加入本次循环的微任务列表, 等待执行
7. 跳出`first`函数, 遇到了`first().then()`, 将它加入本次循环的微任务列表(`p.then`的后面执行)
8. 然后执行同步代码`4`
9. 本轮的同步代码全部执行完毕, 查找微任务列表, 发现`p.then`和`first().then()`, 依次执行, 打印出`1`和`2`
10. 本轮任务执行完毕了, 发现还有一个定时器没有跑完, 接着执行这个定时器里的内容, 执行同步代码5
11. 然后又遇到了一个`resolve(6)`, 它是放在`p`里的, 但是`p`的状态在之前已经发生过改变了, 因此这里就不会再改变, 也就是说`resolve(6)`相当于没任何用处, 因此打印出来的`p`为`Promise{<resolved>: 1}`. 