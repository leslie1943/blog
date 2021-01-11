### Promise 5 - 1

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log('start')

// async1 start
// async2
// start
// async1 end
```

### 过程分析
1. 首先一进来是创建了两个函数的, 我们先不看函数的创建位置, 而是看它的调用位置
2. 发现`async1`函数被调用了, 然后再去看看调用的内容
3. 执行函数中的同步代码 `async1 start`, 之后碰到`await`, 它会阻塞`async1`后面代码的执行, 因此先去执行`async2`中的同步代码. 然后跳出`async1`
4. 跳出`async1`后, 执行同步代码 `start`
5. 在一轮宏任务全部执行完之后, 再来执行刚刚await后面的内容async1 end.

- 在这里,你可以理解为「紧跟着`await`后面的语句相当于放到了`new Promise` 中,下一行及之后的语句相当于放在`Promise.then中`」.
- 让我们来看看将 `await` 转换为 `Promise.then` 的伪代码：

```js
async function async1(){
  console.info('async1 start')

  new Promise(resolve => {
    console.info('async2')
    resolve()
  }).then(res=> console.info('async1 end'))
}
async function async2() {
  console.log("async2");
}
async1();
console.log("start")
```
- 另外关于 `await` 和 `Promise` 的区别, 如果我们把 `await async2()` 换成一个 `new Promise` 呢?

```js
async function async1() {
  console.log("async1 start");
  new Promise(resolve => {
    console.log('promise')
  })
  console.log("async1 end");
}
async1();
console.log("start")

// async1 start
// promise
// async1 end
// start
```
- 可以看到 `new Promise()` 并不会阻塞后面的同步代码 `async1 end` 的执行.
