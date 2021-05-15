### TypeScript-理解函数重载的作用
- 由于 `JavaScript` 是一个动态语言, 我们通常会使用不同类型的参数来调用同一个函数, 该函数会根据不同的参数而返回不同的类型的调用结果
```js
function add(x, y) {
  return x + y;
}

add(1, 2); // 3
add("1", "2"); //"12"
```
- 由于 `TypeScript` 是 `JavaScript` 的超集, 因此以上的代码可以直接在 `TypeScript` 中使用, 但当 `TypeScript` 编译器开启 `noImplicitAny` 的配置项时, 以上代码会提示以下错误信息
```js
// Parameter 'x' implicitly has an 'any' type.
// Parameter 'y' implicitly has an 'any' type.
```
- 该信息告诉我们参数 `x` 和参数 `y` 隐式具有 `any` 类型. 为了解决这个问题, 我们可以为参数设置一个类型. 因为我们希望 `add` 函数同时支持 `string` 和 `number` 类型, 因此我们可以定义一个 `string` | `number` 联合类型, 同时我们为该联合类型取个别名:
```ts
type StringNumber = string | number
```
- 在定义完 Combinable 联合类型后, 我们来更新一下 add 函数:
```ts
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
```
- 为 add 函数的参数显式设置类型之后, 之前错误的提示消息就消失了. 那么此时的 `add` 函数就完美了么, 我们来实际测试一下:
```ts
const result = add('leslie', ' su')
result.split(' ')
```
- 在上面代码中, 我们分别使用 `'leslie'` 和 `' su'` 这两个字符串作为参数调用 `add` 函数, 并把调用结果保存到一个名为 `result` 的变量上, 这时候我们想当然的认为此时 `result` 的变量的类型为 `string`, 所以我们就可以正常调用字符串对象上的 `split` 方法. 但这时 `TypeScript` 编译器又出现以下错误信息了:
```ts
// Property 'split' does not exist on type 'string | number'.
// Property 'split' does not exist on type 'number'.ts(2339)
```
- 很明显 `Combinable` 和 `number` 类型的对象上并不存在 `split` 属性. 问题又来了, 那如何解决呢? 这时我们就可以利用 `TypeScript` 提供的 `函数重载` 


#### 🎃🎃🎃 函数重载
- `函数重载`或`方法重载`是`使用相同名称`和`不同参数数量`或`类型`创建多个方法的一种能力
```ts
type StringNumber = string | number

function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: string, b: number): string
function add(a: number, b: string): string
function add(x: StringNumber, y: StringNumber) {
  if (typeof x === 'string' || typeof y === 'string') {
    return x.toString() + y.toString()
  }
  return x + y
}

const result = add('leslie', ' su')
console.info('result.split(" ")', result.split(' ')) // result.split(" ") [ 'leslie', 'su' ]
```
- 在以上代码中, 我们为 `add` 函数提供了多个函数类型定义, 从而实现函数的重载. 在 `TypeScript` 中除了可以重载普通函数之外, 我们还可以重载类中的成员方法. 
- `方法重载`是指在同一个类中方法同名, `参数不同` (`参数类型不同` `参数个数不同`或`参数个数相同时参数的先后顺序不同`), 调用时根据实参的形式, 选择与它匹配的方法执行操作的一种技术. 所以类中成员方法满足重载的条件是: 在同一个类中, 方法名相同且参数列表不同. 下面我们来举一个成员方法重载的例子:
```ts
type StringNumber = string | number

class Calculator {
  add(a: number, b: number): number
  add(a: string, b: string): string
  add(a: string, b: number): string
  add(a: number, b: string): string
  add(a: StringNumber, b: StringNumber) { // 不是重载列表的部分
    if (typeof a === 'string' || typeof b === 'string') {
      return a.toString() + b.toString()
    }
    return a + b
  }
}

const calculator = new Calculator()
const result = calculator.add('sz', ' leslie')

```
- 这里需要注意的是, 当 `TypeScript` 编译器处理`函数重载`时, 它会查找重载列表, 尝试使用`第一个`重载定义. 如果匹配的话就使用这个. 因此, 在定义重载的时候, 一定要把最精确的定义放在最前面. 
- 另外在 `Calculator` 类中,` add(a: StringNumber, b: StringNumber){ }` 并不是重载列表的一部分, 因此对于 `add` 成员方法来说, 我们只定义了四个重载方法. 