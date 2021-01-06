### Promise 3 - 0 Promise中的then, catch, finally

1. `Promise` 的 状态一经改变就不能再改变 [异步编程: Promise题目(3-1)](https://github.com/leslie1943/blog/issues/124).
2. `.then`和`.catch`都会返回一个新的 `Promise`(只不过这个新的Promise对象的状态是根据`.then`的返回值而定). 参见: [异步编程: Promise题目(1-4)](https://github.com/leslie1943/blog/issues/114).
3. `.catch`不管被连接到哪里, 都能捕获上层未捕获过的错误. 参见: [异步编程: Promise题目(3-2)](https://github.com/leslie1943/blog/issues/125).
4. 在`Promise`中, 返回任意一个非`promise`的值都会被包裹成`promise`对象, 例如
```js
    return 2 
    // 其实会被包装为:
    return Promise.resolve(2)
```

5. `Promise`的`.then`和`.catch`可以被调用多次, 但如果`Promise`内部的状态一经改变, 并且已经有了一个值, 那么后续的每次调用`.then`或者`.catch`的时候都会直接拿到该值
```js
Promise.resolve(2).then((res)=>{
    console.info('res then',res) // 这里会输出
}).catch((res)=>{
    console.info('res catch',res)
})
// 
Promise.reject(2).then((res)=>{
    console.info('res then',res)
}).catch((res)=>{
    console.info('res catch',res) // 这里会输出
})
```
6. `.then`或者`.catch`中`return`一个`error`对象并不会抛出错误,所以不会被后续的`.catch`捕获
```js
Promise.resolve(2).then((res)=>{
    return new Error('error in then')
}).catch((res)=>{
    console.info('res catch',res)
})
// Promise {<fulfilled>: Error: error in then
```
7. `.then`或者`.catch` 返回的值不能是`promise`本身, 否重会造成死循环
8. `.then`或者`.catch` 的参数期望是函数, 传入非函数会发生值透传
9. `.then`方法是接收两个参数的, 第一个是处理成功的函数, 第二个是处理失败的函数, 在某些时候可以任务`catch`是`.then`第二个参数的简便写法.
10. `.finally`方法也是返回一个`Promise`, 他在`Promise`结束的时候,无论结果为`resolved`还是`reject`,都会执行里面的回调函数.