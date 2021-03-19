#### 防抖函数
- 触发高频事件后, n秒内函数只会执行一次, 如果n秒内高频事件再次被触发, 则重新计算时间
- 函数防抖是在频繁触发后, 只执行一次（两者的前提都是频繁触发）, 下拉框输入查询 / 频繁的点赞/取消点赞
```js
/**
 *
 * @param {*} fn :callback function
 * @param {*} duration :duration time,default wait time 0.8 秒
 * @demo in vue methods:
 *      handleEvent: _debounce(function(){
 *        do something
 *      },time)
 */
export const _debounce = (fn, duration = 800) => {
  // create timer
  let timer = null
  return function () {
    // reset once call
    clearTimeout(timer)
    // create a new timer to make sure call after define time
    timer = setTimeout(() => {
      // execute callbak, the 2nd params is fn's arguments
      fn.apply(this, arguments)
    }, duration)
  }
}
```

#### 节流函数
- 触发高频事件后, 在n秒内只会执行一次, 所以节流会稀释函数的执行频率
- 函数节流是固定时间做某一件事, 比如每隔1秒发一次请求
- 监听 滚动条加载更多, 频繁查询
```js
/**
 * @param {*} fn: callback function
 * @param {*} duration : duration time,default wait time 1 sec
 * @demo in vue methods:
 *      handleEvent: _throttle(function(){
 *        do something
 *      },time)
 */
export const _throttle = (fn, duration = 1000) => {
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    // execute callbak, the 2nd params is fn's arguments
    fn.apply(this, arguments)
    setTimeout(() => {
      canRun = true
    }, duration)
  }
}
```

#### 防抖是将多次执行变为只执行一次, 节流是将多次执行变为每隔一段时间执行
#### 函数防抖是某一段时间内只执行一次, 而函数节流是间隔时间执行