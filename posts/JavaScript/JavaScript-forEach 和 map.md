## JavaScript: forEach 和 map

### 相同点
- 都是循环遍历数组中的每一项
- `forEach`和`map`方法里每次执行匿名函数都支持3个参数:`item(当前项)`, `index(索引值)`, `arr(原数组)`需要用哪个的时候就写哪个, 匿名函数中 `this`都是指向`window`


### 不同点
- `map()`方法返回一个新的数组, 数组中的元素为原始数组调用函数处理后的值.
- `map()`方法不会改变原始数组
- `map()`方法不会对空数组进行检测

- `forEach`方法用于调用数组的每个元素, 将元素传给回调函数(没有return, 返回值是 undefined)
- `forEach()`对于空数组是不会调用回调函数的

```js
var arr1 = [1,2,3,4]
var arr2 = arr1.map(item => item+1)
var arr3 = arr1.forEach(item => item * 2)

var arr_empty_1 = []
var arr_empty_2 = arr_empty_1.map(item => item+1)


console.info(arr1) // [1,2,3,4]
console.info(arr2) // [1,2,3,4]
console.info(arr3) // undefined
console.info(arr_empty_1) // []
console.info(arr_empty_2) // []
```