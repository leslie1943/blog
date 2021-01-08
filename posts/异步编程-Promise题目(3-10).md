### Promise 3 - 10
- 接下来看看`.finally()`
1. `.finally()`方法不管`Promise`对象最后的状态如何都会执行
2. `.finally()`方法的回调函数不接受任何的参数, 也就是说在`.finally()`函数中是没办法知道`Promise`的最终状态是`resolved`还是`rejected`的
3. 它最终返回的默认会是一个`上一次的Promise对象值`, 不过如果抛出的是一个异常则返回异常的`Promise`对象

```js
Promise.resolve('1')
  .then(res => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
  	return '我是finally2返回的值'
  })
  .then(res => {
    console.log('finally2后面的then函数', res)
  })
// 1
// finally2
// finally
// finally2后面的then函数 2
```
- 至于为什么finally2的打印要在finally前面, 请看下一个例子中的解析
- 不过在此之前让我们再来确认一下,finally中要是抛出的是一个异常是怎样的:
```js
Promise.resolve('1')
  .finally(() => {
    console.log('finally1')
    throw new Error('我是finally中抛出的异常')
  })
  .then(res => {
    console.log('finally后面的then函数', res)
  })
  .catch(err => {
    console.log('捕获错误', err)
  })
// finally1
// 捕获错误 Error: 我是finally中抛出的异常
```

- 再来一个难的🌰
```js
function promise1 () {
  let p = new Promise((resolve) => {
    console.log('promise1');
    resolve('1')
  })
  return p;
}
function promise2 () {
  return new Promise((resolve, reject) => {
    reject('error')
  })
}
promise1()
  .then(res => console.log(res))
  .catch(err => console.log(err))
  .finally(() => console.log('finally1'))

promise2()
  .then(res => console.log(res))
  .catch(err => console.log(err))
  .finally(() => console.log('finally2'))

// promise1
// 1
// error
// finally1
// finally2
```
### 过程分析
1. 首先定义了两个函数`promise1`和`promise2`, 先不管接着往下看.
2. `promise1`函数先被调用了, 然后执行里面`new Promise`的同步代码打印出`promise1`
3. 之后遇到了`resolve(1)`, 将`p`的状态改为了`resolved`并将结果保存下来.
4. 此时`promise1`内的函数内容已经执行完了, 跳出该函数
5. 碰到了`promise1().then()`, 由于`promise1`的状态已经发生了改变且为`resolved`因此将`promise1`().then()这条微任务加入本轮的微任务列表(这是第一个微任务)
6. <font color="red">这时候要注意了, 代码并不会接着往链式调用的下面走, 也就是不会先将`.finally`加入微任务列表, 那是因为`.then`本身就是一个微任务, 它链式后面的内容必须得等当前这个微任务执行完才会执行, 因此这里我们先不管`.finally()`</font>
7. 再往下走碰到了`promise2`()函数, 其中返回的`new Promise`中并没有同步代码需要执行, 所以执行`reject('error')`的时候将`promise2`函数中的`Promise`的状态变为了`rejected`
8. 跳出`promise2`函数, 遇到了`promise2().catch()`, 将其加入当前的微任务队列(这是第二个微任务), 且链式调用后面的内容得等该任务执行完后才执行, 和`.then()`一样.
9. OK,  本轮的宏任务全部执行完了, 来看看微任务列表, 存在`promise1().then()`, 执行它, 打印出1, 然后遇到了`.finally()`这个微任务将它加入微任务列表(这是第三个微任务)等待执行
10. 再执行`promise2().catch()`打印出 `error`, 执行完后将`finally2`加入微任务加入微任务列表(这是第四个微任务)
11. OK,  本轮又全部执行完了, 但是微任务列表还有两个新的微任务没有执行完, 因此依次执行`finally1`和`finally2`.