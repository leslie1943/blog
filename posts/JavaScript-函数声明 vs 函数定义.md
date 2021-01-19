## JavaScript 函数声明 vs  函数定义
- `JavaScript Function` 有两种类型

#### 函数声明- Function declaration
```js
console.info(funDeclaration('Declaration')) // 定义前调用 ==> ✅
function funDeclaration(type){
    return type  === 'Declaration' 
}
```

#### 函数表达式- Function expression
```js
console.info(expressionFun('Expression')) // 定义前调用 ==> ❌
var expressionFun = function (type){
    return type  === 'Expression' 
}
console.info(expressionFun('Expression')) // 定义前调用 ==> ✅
```

- 函数声明创建的函数(`funDeclaration`)可以在方法定义前就调用; 
- 而表达式创建的函数(`expressionFun`)不能在其被赋值前进行调用
- 这就要理解 `Javascript Function` 两种类型的区别: 用函数声明创建的函数可以在函数解析后调用(解析时进行等逻辑处理);而用函数表达式创建的函数是在运行时进行赋值,且要等到表达式赋值完成后才能调用
- 这个陷阱的本质原因体现在这两种类型在`Javascript function hoisting`(函数提升)和运行时机(解析时/运行时)上的差异

```js
// 代码 1
funDeclaration('Declaration')
function funDeclaration(type){
    return type  === 'Declaration' 
}
// 相当于
function funDeclaration(type){ // 函数提升了
    return type  === 'Declaration' 
}
funDeclaration('Declaration')
```

```js
// 代码 2
expressionFun('Expression')
var expressionFun = function (type){
    return type  === 'Expression' 
}
// 相当于
var expressionFun // 表达式提升了
expressionFun('Expression')
expressionFun = function (type){
    return type  === 'Expression' 
}
```

### 总结
- `JavaScript`中函数声明和函数表达式是存在区别的 
- ✅ `函数声明`是在`JS`解析时进行函数提升, 因此在同一个作用域内, 不管函数声明在哪定义, 该函数都可以进行调用. 
- ✅ `函数表达式`的值在`JS`运行时确定,并且在表达式赋值完成后, 该函数才能调用.