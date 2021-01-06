### Promise 3 - 6
```js
Promise.resolve()
  .then(() => {
    return new Error('error!!!') // Promise.resolve('Error:error!!!')
  })
  .then((res) => {
    console.info('then:', res)
  })
  .catch((err) => {
    console.info('catch:', err)
  })

//  then: Error: error
```

### 过程分析
在[异步编程: Promise题目(3-0)](https://github.com/leslie1943/blog/issues/123).中提到过的 `4` 和 `6`
4. 在`Promise`中, 返回任意一个非`promise`的值都会被包裹成`promise`对象, 例如
```js
    return 2 
    // 其实会被包装为:
    return Promise.resolve(2)
```
6. `.then`或者`.catch`中`return`一个`error`对象并不会抛出错误,所以不会被后续的`.catch`捕获

- 当然如果你抛出一个错误的话，可以用下面👇两的任意一种：
```js
  return Promise.reject(new Error('error!!!'));
  // 或
  throw new Error('error!!!')
```