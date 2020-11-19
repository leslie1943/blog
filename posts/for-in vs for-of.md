#### for-in vs for-of
- `for-in`: 得到的是数组的下标或者对象的Key
```js
const arr = [1,2,3,4,5]
for(let item in arr){
    console.info(item) // 0 , 1 , 2 , 3, 4 
}
```
- `for-of`: 得到的是对象(set 或者 map) 的 `value`, 或者是数组的`元素`
```js
const arr = [1,2,3,4,5]
for(let item of arr){
    console.info(item) //1,2,3,4,5
}
```