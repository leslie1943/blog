### Promise 4 - 1
- 先来了解一下`Promise.all()`和`Promise.race()`的用法
- `.all()`的作用是接收一组异步任务, 然后并行执行异步任务, 并且在所有异步操作执行完后才执行回调
- `.race()`的作用也是接收一组异步任务,然后并行执行异步任务,只保留取第一个执行完成的异步操作的结果,其他的方法仍在执行,不过执行结果会被抛弃.

- 我们知道如果直接在脚本文件中定义一个Promise, 它构造函数的第一个参数是会立即执行的, 就像这样: 
```js
const p1 = new Promise(r=>console.info('立即打印'))
// 控制台会立即打印出 '立即打印'
```
- 因此为了控制它什么时候执行, 我们可以用一个函数来包裹它, 在需要它执行的时候, 调用这个函数就可以了
```js
function runP1(){
   const p1 = new Promise(r => console.log('立即打印'))
   return p1
}

runP1() // 调用此函数时才执行
```

- OK 👌,  让我们回归正题.
- 现在来构建这么一个函数: 
```js
function runAysnc(x){
  const p = new Promise(r=> setTimeout()=> r(x, console.info(x)),1000)
  return p
}
// 该函数传入一个值x, 然后间隔一秒后打印出这个x.
// 如果我用.all()来执行它会怎样呢？
```
```js
function runAsync (x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
    return p
}
Promise.all([runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log(res))
// 运行结果:
// 1
// 2
// 3
// [1,2,3]
// 因为要等所有的异步都结束后才返回结果
```
- 所以你现在能理解这句话的意思了吗: 有了`all`, 你就可以并行执行多个异步操作, 并且在一个回调中处理所有的返回数据.
- `.all()`后面的`.then()`里的回调函数接收的就是所有异步操作的结果
- 而且这个结果中数组的顺序和`Promise.all()`接收到的数组顺序一致!
```bash
有一个场景是很适合用这个的, 一些游戏类的素材比较多的应用, 打开网页时, 预先加载需要用到的各种资源如图片、flash以及各种静态文件. 所有的都加载完后, 我们再进行页面的初始化. 
```