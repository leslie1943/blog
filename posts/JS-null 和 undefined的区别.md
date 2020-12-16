## null 和 undefined的区别


### 一、相似性
- 在 `JavaScript` 中, 将一个变量赋值为 `undefined` 或 `null`, 老实说, 几乎没区别.
```js
var a = undefined
var a = null
```
- `undefined` 和 `null` 在 `if` 语句中, 都会被自动转为 `false` , 相等运算符甚至直接报告两者相等.
```js
if (!undefined) 
    console.log('undefined is false');
// undefined is false

if (!null) 
    console.log('null is false');
// null is false

undefined == null
// true
```

### 二、历史原因
- `JavaScript` 的设计者 `Brendan Eich`, 觉得这样做还不够, 有两个原因.
- 首先, `null` 像在 `Java` 里一样, 被当成一个对象.但是, `JavaScript` 的数据类型分成原始类型(`primitive`)和合成类型(`complex`)两大类, `Brendan Eich`觉得表示"无"的值最好不是对象.
- 其次, `JavaScript` 的最初版本没有包括错误处理机制, 发生数据类型不匹配时, 往往是自动转换类型或者默默地失败.`Brendan Eich`觉得, 如果 `null` 自动转为`0`, 很不容易发现错误.
- 因此, `Brendan Eich``又设计了一个undefined`.


### 三、最初设计
- `null` 是一个表示`"无"`的对象,转为数值时为 0
- `undefined` 是一个表示`"无"`的原始值,转为数值时为NaN

### 四、目前的用法
- null表示"没有对象", 即该处不应该有值. 典型用法是:
```bash
#（1） 作为函数的参数, 表示该函数的参数不是对象. 
#（2） 作为对象原型链的终点. 
# Object.getPrototypeOf(Object.prototype) // null
```
- `undefined` 表示"缺少值", 就是此处应该有一个值, 但是还没有定义. 典型用法是:
```bash
#（1）变量被声明了, 但没有赋值时, 就等于 undefined. 

#（2) 调用函数时, 应该提供的参数没有提供, 该参数等于 undefined. 

#（3）对象没有赋值的属性, 该属性的值为 undefined. 

#（4）函数没有返回值时, 默认返回 undefined. 
```
```js

var i;
i // undefined

function f(x){console.log(x)}
f() // undefined

var  o = new Object();
o.p // undefined

var x = f();
x // undefined

```

### 总结
- `null` 表示"没有对象", 即该处不应该有值.
- `undefined` 表示"缺少值", 就是此处应该有一个值, 但是还没有定义.