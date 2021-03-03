### Promise 5 - 3

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log('timer1')
  }, 0)
}
async function async2() {
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log('timer3')
}, 0)
console.log("start")
// PRINT RESULT: 
// async1 start, async2,start,async1 end,timer2,timer3,timer1
```

### 过程分析
- 定时器谁先执行, 你只需要关注谁先被调用的以及延迟时间是多少, 这道题中延迟时间都是0, 所以只要关注谁先被调用的。。



