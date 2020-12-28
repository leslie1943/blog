## 💛 原由
你是否运行过不按你预期运行的 `js` 代码?

比如:某个函数被随机的、不可预测时间的执行了, 或者被延迟执行了.

这时, 你需要从 `ES6` 中引入的一个非常酷的新特性: `Promise` 来处理你的问题.

为了深入理解 `Promise` , 我在某个不眠之夜, 做了一些动画来演示 `Promise` 的运行, 我多年来的好奇心终于得到实现.

对于 `Promise` , 您为什么要使用它, 它在底层是如何工作的, 以及我们如何以最现代的方式编写它?

## 💛 介绍
在书写 JavaScript 的时候,我们经常不得不去处理一些依赖于其它任务的任务! 

比如:我们想要得到一个图片,对其进行压缩,应用一个滤镜,然后保存它 .
1. 首先,先用 getImage 函数要得到我们想要编辑的图片.
2. 一旦图片被成功加载,把这个图片值传到一个 ocmpressImage 函数中.
3. 当图片已经被成功地重新调整大小后,在 applyFilter 函数中为图片应用一个滤镜.
4. 在图片被压缩和添加滤镜后,保存图片并且打印成功的日志! 
最后,代码很简单如图
```js
getImage('./image.png',(image,error) => {
    if(err) throw new Error(err)
    compressImage(image, (compressedImage,err) => {
        if(err) throw new Error(err)
        applyFilter(compressedImage,(filteredImage,err) => {
            if(err) throw new Error(err)
            saveImage(filteredImage,(res,err) => {
                if(err) throw new Error(err)
                console.info('Successfully saved image!')
            })
        })
    })
})
```
注意到了吗? 尽管以上代码也能得到我们想要的结果,但是完成的过程并不是友好.

使用了大量嵌套的`回调函数`, 这使我们的代码阅读起来特别困难.

因为写了许多嵌套的`回调函数`, 这些`回调函数`又依赖于前一个`回调函数`, 这通常被称为 回调地狱.

幸运的, `ES6` 中的 `Promise` 的能很好的处理这种情况! 

让我们看看 `promise` 是什么, 以及它是如何在类似于上述的情况下帮助我们的.


## 💛 Promise 语法
ES6引入了Promise.在许多教程中, 你可能会读到这样的内容:

<font color="#FF4F79">Promise 是一个值的占位符, 这个值在未来的某个时间要么 resolve 要么 reject </font>

对于我来说, 这样的解释从没有让事情变得更清楚.

事实上, 它只是让我感觉 Promise 是一个奇怪的、模糊的、不可预测的一段魔法.

接下来让我们看看 promise 真正是什么?

我们可以使用一个接收一个回调函数的 Promise 构造器创建一个 promise.

<img src="../images/promise/2.gif" height="300">

等等, 刚刚得到的返回值是什么?

`Promise` 是一个对象, 它包含一个状态 `PromiseStatus` 和一个值 `PromiseValue`.

在上面的例子中, 你可以看到 `PromiseStatus`  的值是 `pending`, `PromiseValue` 的值是 `undefined`.

不过 - 你将永远不会与这个对象进行交互, 你甚至不能访问 `PromiseStatus` 和  `PromiseValue` 这两个属性! 

然而, 在使用 `Promise` 的时候, 这俩个属性的值是非常重要的.

---

`PromiseStatus` 的值, 也就是 `Promise` 的状态, 可以是以下三个值之一:
- ✅ `fulfilled`: `promise` 已经被 `resolved`. 一切都很好, 在 promise 内部没有错误发生. 

- ❌ `rejected`: `promise` 已经被 `rejected`. 哎呦, 某些事情出错了. 

- ⏳ `pending`: `promise` 暂时还没有被解决也没有被拒绝, 仍然处于 `pending` 状态

好吧, 这一切听起来很棒, 但是什么时候 `promise` 的状态是 `pending` `、fulfilled` 或 `rejected` 呢?  为什么这个状态很重要呢?

在上面的例子中, 我们只是为 `Promise` 构造器 `new Promise()` 传递了一个简单的回调函数 `() => {}` .

然而, 这个回调函数实际上接受两个参数.
1. 第一个参数的值经常被叫做 `resolve` 或 `res`, 它是一个函数, 在 `Promise`顺利解决`resolve`的时候被调用.

2. 第二个参数的值经常被叫做 `reject` 或 `rej`, 它也是一个函数, 在`Promise`出现一些错误应该被拒绝`reject`的时候调用

<img src="../images/promise/3.png" height="300">

让我们尝试看看当我们调用 `resolve` 或 `reject` 方法时得到的日志.

在例子中, 把 `resolve` 方法叫做 `res`, 把  `reject` 方法叫做 `rej`

<img src="../images/promise/4.gif" height="300">

太好了! 我们终于知道如何摆脱 `pending` 状态和 `undefined` 值了! 

- 当我们调用 `resolve` 方法时,`promise` 的状态是 `fulfilled` ✅.

- 当我们调用 `reject` 方法时,`promise` 的状态是 `rejected` ❌.

好了, 现在我们知道如何更好控制那个模糊的 `Promise` 对象. 但是他被用来做什么呢?

在前面的介绍章节, 我展示了一个获得图片、压缩图片、为图片应用过滤器并保存它的例子!最终, 这变成了一个混乱的嵌套回调.

幸运的, `Promise` 可以帮助我们解决这个问题!

首先, 让我们重写整个代码块, 以便每个函数返回一个 `Promise` 来代替之前的函数.

如果图片被加载完成并且一切正常, 让我们用加载完的图片解决 (`resolve`)`promise`.

如果图片被加载完成并且一切正常, 让我们用加载完的图片解决 (`resolve`)`promise`.

否则, 如果在加载文件时某个地方有一个错误, 我们将会用发生的错误拒绝 (`reject`)`promise` .
```js
function getImage(file){
    return new Promise((resolve, reject) => {
        try{
            const data = readFile(file)
            resolve(data)
        }catch(err){
            reject(new Error(err))
        }
    })
}
```
让我们看下当我们在终端运行这段代码时会发生什么？

<img src="../images/promise/7.gif" height="300">

非常酷!就像我们所期望的一样, `promise` 得到了解析数据后的值.

但是现在呢？我们不关心整个 `promise` 对象, 我们只关心数据的值!幸运的, 有`内置的方法`来得到 `promise` 的值.

对于一个 `promise`, 我们可以使用它上面的 3 个方法：

- `.then()`: 在一个 `promise` 被 `resolved` 后调用
- `.catch()`: 在一个 `promise` 被 `rejected` 后被调用
- `.finally()`: 不论 `promise` 是被 `resolved` 还是 `reject` 总是调用

```js
getImage(file)
    .then(image => console.info(image))
    .catch(error => console.info(error))
    .finally(() => console.info('All done!'))
```
`.then` 方法接收传递给 `resolve` 方法的值.

<img src="../images/promise/9.gif" height="300">

`.catch` 方法接收传递给 `rejected` 方法的值.

<img src="../images/promise/10.gif" height="300">

最终, 我们拥有了 `promise` 被解决后 (`resolved`) 的值, 并不需要整个 `promise` 对象!

现在我们可以用这个值做任何我们想做的事.

---

顺便提醒一下, 当你知道一个 `promise` 总是 `resolve` 或者总是 `reject` 的时候, 你可以写 `Promise.resolve` 或 `Promise.reject`, 传入你想要 `reject` 或 `resolve` 的 `promise` 的值.

<img src="../images/promise/11.png" height="300">

在下边的例子中你将会经常看到这个语法. 

在 `getImage` 的例子中, 为了运行它们, 我们最终不得不嵌套多个回调. 幸运的, `.then` 处理器可以帮助我们完成这件事! 

`.then` 它自己的执行结果是一个 `promise`. 这意味着我们可以链接任意数量的 `.then`：前一个 `then` 回调的结果将会作为参数传递给下一个 `then` 回调.

```js
Promise.resolve(5) // Promise { 5 }
    .then(res => res * 2) // Promise { 10 }
    .then(res => res * 2) // Promise { 20 }
    .then(res => res * 2) // Promise { 40 }
    .then(res => res * 2) // Promise { 80 }
    .then(res => res * 2) // Promise { 160 }
```
<img src="../images/promise/12.png" height="300">

在 `getImage` 示例中, 为了传递被处理的图片到下一个函数, 我们可以链接多个 `then` 回调.

相比于之前最终得到许多嵌套回调, 现在我们得到了整洁的 `then` 链.

<img src="../images/promise/13.png" height="300">

完美! 这个语法看起来已经比之前的嵌套回调好多了.


## 宏任务和微任务
