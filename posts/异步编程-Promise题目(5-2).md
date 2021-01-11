### Promise 5 - 2

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  setTimeout(() => {
    // 宏任务
    console.log('timer')
  }, 0)
  console.log('async2')
}
async1()
console.log('start')

/**
 * async1 start
 * async2
 * start
 * async1 end
 * timer
 */

```

### 过程分析
没错, 定时器始终还是最后执行的, 它被放到下一条宏任务的延迟队列中.
1. 调用`async1`
2. 执行`async1`的同步代码,输出`async1 start`
3. 调用`async2`函数, 碰到`setTimeout`,放到`宏任务队列`中
4. 执行`async2`的同步代码, 输出`async2`
5. 跳出`async1`函数,执行同步代码输出`start`
6. 全部执行结束, 检测微任务队列`await`阻塞的代码. 输出`async1 end`
7. 检测宏任务队列 输出`timer`

