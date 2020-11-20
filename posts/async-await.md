#### async / awaut
- `async`: 异步 => `async` 用于申明一个`function`是异步的.
- `await`: 等待 => `async wait`的简写, 用于等待一个异步方法执行完成.
```bash
    # await 只能出现在 async 函数中.
```

#### async 起什么作用
- 这个问题的关键在于, `async` 函数是怎么处理他的返回值的
```js
async function asyncFn(){
    return 'Hello Async'
}
const result = asyncFn()
console.info(result)
/**
* __proto__: Promise
* [[PromiseState]]: "fulfilled"
* [[PromiseResult]]: "Hello Async"
**/
// 🎨🎨🎨 返回的是一个 Promise 对象 🎨🎨🎨
```
- `async` 函数 输出的是一个 `Promise` 对象, 即便是`async`函数中`return`一个直接量, `async`会把这个直接量通过`Promise.resolve()`封装成`Promise`对象.
- `Promise.resolve(x)` 是 `new Promise(resolve => resolve(x))` 的简写
- 当`async`函数返回的是一个`Promise`对象, 在最外层不能用`await`获取`async`函数返回值的情况下, 需要使用原来的方式 `.then()`链处理这个对象
```js
asyncFn().then(v => {
    console.info(v) // 输出 hello async.
})
```

#### await
- 一般来说, `await`是在等待一个`async`函数完成. 不过按照语法说明, `await`等待的是一个表达式, 这个表达式的计算结果是`Promise`对象或者是`其他值`
```js
function syncFn(){
    return 'something sync'
}

async function asyncFn(){
    return Promise.resolve('something async')
}

async function test(){
    const v1 = await syncFn()
    const v2 = await asyncFn()
    console.info('syncFn:', v1)
    console.info('asyncFn:', v2)
}

test()
/**
* // 输出结果
* syncFn: something sync
* asyncFn: something async
**/
```

#### await 等待了结果后的执行
- `如果它等到的不是一个Promise对象`, 那 `await`表达式的运算结果就是它等到的东西
- `如果它等到的是一个Promise对象`, 那么`await`就会忙碌起来了,它会阻塞后面的代码, 等着`Promise`对象`resolve`,然后得到`resolve`的值, 作为`await`表达式的运算结果.这里说的`阻塞`不用担心, 这是`await`必须用在`async`函数中的原因,`async`函数调用不会造成阻塞, 它内部所有的阻塞都被封装在一个`Promise`对象中异步执行.


#### async / await 帮我们做了什么?
- 上面已经说明了`async`会将其后的函数的返回值封装成一个`Promise`对象, 而`await`会等待这个`Promise`完成, 并将其`resolve`的结果返回出来
```js
// 💛💛💛 .then()的调用方式
function takeLongTimeFn(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('long_time_value')
        },1000)
    })
}

takeLongTimeFn().then(v => {
    console.info('got', v)
})
```
```js
// 💛💛💛 async/await的调用方式
function takeLongTimeFn(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('long_time_value')
        },1000)
    })
}
async function test(){
    const v = await takeLongTimeFn()
    console.info('got',v )
}
test()
```

#### async / await 的优势在于处理 then 链
- 单一的`Promise`链并不能发现`async/await`的优势,但是, 如果需要处理多个`Promise`组成的`then`链的时候,优势就能体现出来.(🙃🙃`Promise`通过`then`链来解决多层回调的问题,现在又用`async/await`来优化它🙃🙃)
```js
/**
    传入参数n, 表示这个函数执行的时间
    执行的结果是 n+200,将这个值用于下一个步骤
**/
function takeLongTime(n){
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n)
    })
}

function step1(n){
    console.info(`step 1 with ${n}`)
    return takeLongTime(n)
}

function step2(n){
    console.info(`step 2 with ${n}`)
    return takeLongTime(n)
}

function step3(n){
    console.info(`step 3 with ${n}`)
    return takeLongTime(n)
}

// 使用 .then 链式调用
function doIt(){
    console.time('doIt')
    const time1 = 300
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.info(`result is ${result}`)
            console.timeEnd('doIt')
        })
}
doIt()

/**
    step 1 with 300
    step 2 with 500
    step 3 with 700
    result is 900
    doIt: 1503.203857421875 ms
**/

// 使用 async/await 调用
async function doIt(){
    console.time('doIt')
    const time1 = 300
    const time2 = await step1(time1)
    const time3 = await step2(time1)
    const result = await step3(time1)
    console.info(`result is ${result}`)
    console.timeEnd('doIt')
}
doIt()
```
