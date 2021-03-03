#### 函数式编程
- `面向对象的思想`: 把现实世界中的事物抽象成程序中的类和对象,通过封装, 继承, 和多态来演示事物事件的联系
- `函数式编程的思想`: 把现实世界中的事物和事物之间的联系抽象到程序世界, (💛💛💛对运算过程进行抽象💛💛💛)
```js
/**
 *  💛 程序的本质: 根据输入通过某种运算获取相应的输出,程序开发过程中会涉及很多有输入和输出的函数
 *  💛 x -> f (联系、映射) -> y   y=f(x)
 *  💛 函数式编程中的函数指的不是程序中的函数(方法),而是数学中的函数(映射关系): y=sin(x) x和y的关系
 *  💛 相同的输入始终要得到相同的输出(纯函数)
 *  💛 函数式编程用来描述数据(函数)之间的映射
 */
// 💛💛💛对运算过程进行抽象💛💛💛
```

#### 控制函数只执行一次
```js
function once(fn){
    let done = false // 方法未执行
    return function() {
        if(!done){
            console.info('done in if', done)
            done = true // 标记这个函数已经被执行了
            // 调用 fn 的时候需要参数, arguments是调用返回的function(带有【上面带有return的那个函数】)接收的参数
            return fn.apply(this, arguments)
        } else {
            console.info('done in else', done)
        }
    }
}
// 通过once生成了一个函数pay
let pay = once(function(money){
    console.info(`支付了${money}`)
})

pay(5); // done in if false, 支付了5
pay(5); // done in else true
pay(5); // done in else true
pay(5); // done in else true
```

#### 函数柯里化
```js
/**
 * 什么是柯里化?
 * 1：当我们的函数有多个参数的时候,可以改造这个函数
 * 2：调用这个函数只传入部分的参数调用它(这部分参数后续不会改变)并且让这个函数返回一个新的函数
 * 3：新的函数接收剩余的参数,并且返回相应的结果
 */


// 柯里化-ES6
const checkAge = base => (age => age >= base)
// 柯里化-Normal
function checkAge(base) {
  return function (age) {
    return age >= base
  }
}

const check_18 = checkAge(18)
const check_22 = checkAge(22)
info(check_18(20))
info(check_22(20))

```