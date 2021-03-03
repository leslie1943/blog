### 异步编程: 实现一个 sleep 函数
```js
const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("return value");
    }, time);
  });
};
sleep(3000).then((res) => {
  console.info("res", res);
});
```