### JavaScript-每间隔一秒输出

#### 使用闭包
```js
function print(i) {
  setTimeout(() => {
    console.info(i)
  }, i * 1000)
}
for (var i = 0; i < 5; i++) {
  print(i)
}
```

#### 使用块级作用域
```js
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.info(i)
  }, i * 1000)
}
```
