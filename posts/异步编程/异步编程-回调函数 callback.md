## 回调函数 callback
- 异步编程的根基
- `回调函数`也被称为`高阶函数`
- `高阶函数`是一个函数, 它`接收函数作为参数`或`将函数作为输出返回`
- 操作函数的函数称为 `高阶函数`
- 把一段可执行的代码A(一个函数A)作为`参数`传递给其他的代码B(另一个函数B),并在需要的时候方便调用这个可执行代码A(回调函数)
```js
// 场景
// 当我们在装修房子的时候,你负责采购材料, 我负责粉刷墙面
// 当你还没有买回材料的时候, 我不能一直等着你, 我就写了个纸条告诉你如何粉刷(回调函数)
// 当你买回来材料后, 就按照我给你写的方法粉刷墙面

function paint(){
    console.info('设计师: Good job, 你已经买了材料, 按照我留的说明开始干活吧!')
}

function buyMaterial(callback){
    console.info('建筑师: 开始买东西...')

    // 坐车, 逛店铺, 讨价还价, 装车 等一系列的耗时操作
    setTimeout(()=>{
        console.info('建筑师: 终于买回来了')
        // 我看看你想让我怎么做
        callback()
    },3000)
}

buyMaterial(paint)
```