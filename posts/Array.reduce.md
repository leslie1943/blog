#### 🎃 计算数组里所有值的和
```js
// 0 为初始值
const total = [0,1,2,3,4].reduce((acc, cur) => acc + cur, 0)
```

#### 🎃 二维数组转化为一维
```js
const flattened = [[0,1], [2, 3], [4, 5]].reduce((acc,cur) => acc.concat(cur), []) 

```

#### 🎃 计算数组中每个元素出现的次数
```js
var names =  ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
var countedNames = names.reduce((allNames, name)=>{
    if(name in allNames) {
        allNames[name]++
    } else {
        allNames[name] = 1
    }
    return allNames
}, {})
```

#### 🎃 按属性对object分类
```js
const people = [
    { name: 'Alice', age: 21 },
    { name: 'Max', age: 20 },
    { name: 'Jane', age: 20 }
]
const  groupBy = (objectArray, property) => {
    return objectArray.reduce((acc,obj) => {
        var key = obj[property]
        if(!acc[key]){
            acc[key] = []
        }
        acc[key].push(obj)
        return acc
    },{})
}

const groupedPeople = groupBy(people, 'age')

// { 
//   20: [
//     { name: 'Max', age: 20 }, 
//     { name: 'Jane', age: 20 }
//   ], 
//   21: [{ name: 'Alice', age: 21 }] 
// }
```

#### 🎃 数组去重
```js
const myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
const uniqueArray = myArray.reduce((acc,cur)=>{
    if(acc.indexOf(cur) == -1){
        acc.push(cur)
    }
    return acc
}, [])

console.info(uniqueArray) // ["a", "b", "c", "e", "d"]
```

#### 🎃 按顺序运行Promise
```js
/**
 * Runs promises from array of functions that can return promises
 * in chained manner
 *
 * @param {array} arr - promise arr
 * @return {Object} promise object
 */
function runPromiseInSequence(arr, input) {
    return arr.reduce(
      (promiseChain, currentFunction) => promiseChain.then(currentFunction), Promise.resolve(input)
    );
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
 return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10)
  .then(console.log);   // 1200
```