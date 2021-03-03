#### 使用 Promise + setTimeout 模拟一个异步方法

```js
// 定义异步执行方法
function makeItem(counter){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve({
                id: counter,
                 weight: Math.floor(Math.random() * 1000),
                isEaten: false, 
            })
        },2000)
    })
}

// 定义异步调用方法
async function getItem(){
    const item = await makeItem(1)
    console.info('item', item)
}

// 测试
getItem()
```