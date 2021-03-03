#### Object的 hasOwnProperty 和 in
- `hasOwnPropery`: 不会去判断原型变量和方法
- `in`: 会去判断原型变量和方法

```js
// hasOwnProperty 方法不会去判断原型
console.info(data.hasOwnProperty("name")) // true
console.info(data.hasOwnProperty("hasOwnProperty")) // false
// in 方法会去判断原型
console.info('name' in data) // true
console.info('hasOwnProperty' in data) // true
// getOwnPropertyNames
console.info(Object.getOwnPropertyNames(data)) // ['name','company']
// keys
console.info(Object.keys(data)) // ['name','company']
```