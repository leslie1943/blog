## TypeScript-泛型-2-泛型约束

### 🚀 泛型约束?
- 有时我们可能希望`限制`每个`类型变量`接收的`类型数量`,这就是泛型约束的作用.

#### 💛 4.1 确保属性存在
- 希望`类型变量`对应的`类型`上存在某些属性. 这时, 除非我们显式地将特定属性定义为`类型变量`, 否则编译器不会知道他们的存在.
- 一个很好的例子是在处理字符串或数组时, 我们会假设 `length` 属性是可用的. 让我们再次使用 `identity` 函数并尝试输出参数的长度.
```ts
function identity<T>(arg: T): T {
  console.info(arg.length)
  return arg
}
```
- 在这种情况下, 编译器将不会知道 T 确实含有 `length` 属性, 尤其是在可以将任何类型赋给类型变量 `T` 的情况下.我们需要做的就是让类型变量 `extends` 一个含有我们所需属性的接口, 比如这样
```ts
interface Length {
  length: number
}
function identity<T extends Length>(arg: T): T {
  console.info(arg.length)
  return arg
}
```
- `T extends Length` 用于告诉编译器, 我们支持已经实现 `Length` 接口的任何类型. 之后, 当我们使用不含有 `length` 属性的对象作为参数调用  `identity` 函数时, TypeScript 会提示相关的错误信息：
```ts
// identity(52) // Argument of type 'number' is not assignable to parameter of type 'Length'.ts(2345)
```
- 此外, 我们还可以使用 `,` 号来分隔多种约束类型, 比如：`<T extends Length, Type2, Type3>`. 而对于上述的 `length` 属性问题来说, 如果我们显式地将变量设置为数组类型, 也可以解决该问题, 具体方式如下
```ts
function identity2<T>(arg: T[]): T[] {
  console.info(arg.length)
  return arg
}
identity2([1, 2, 3]) // function identity2<number>(arg: number[]): number[]
identity2([`1`, `2`, `3`]) // function identity2<string>(arg: string[]): string[]

// 或者
function identity3<T>(arg: Array<T>): Array<T> {
  console.info(arg.length)
  return arg
}
```

#### 💛 4.2 检查对象上的键是否存在
- 泛型约束的另一个常见的使用场景就是检查对象上的键是否存在. 不过在看具体示例之前, 我们得来了解一下 `keyof` 操作符, `keyof` 操作符是在 `TypeScript 2.1` 版本引入的, 该操作符可以用于获取某种类型的所有键, 其返回类型是联合类型. 举个 `keyof` 的使用示例：
```ts
interface Person {
  name: string
  age: number
  location: string
}

type K1 = keyof Person // 'name' | 'age' | 'location'
type K2 = keyof Person[] // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person } // string | number
```
- 通过`keyof`操作符, 我们就可以获取指定类型的所有键, 之后我们就可以结合前面介绍的`extends`约束,限制输入属性名包含在`keyof`返回的联合类型中.
```ts
interface Person {
  name: string
  age: number
  location: string
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const person: Person = {
  name: 'su',
  age: 22,
  location: 'dalian',
}

// function getProperty<Person, "age">(obj: Person, key: "age"): number
console.info('getProperty(person, "age")', getProperty(person, 'age')) 

// function getProperty<Person, "name">(obj: Person, key: "name"): string
console.info('getProperty(person, "name")', getProperty(person, 'name')) 
```
- 在以上的 `getProperty` 函数中, 我们通过 `K extends keyof T` 确保参数 `key` 一定是对象中含有的键, 这样就不会发生运行时错误. 这是一个类型安全的解决方案, 与简单调用 `let value = obj[key];` 不同. 

- demo
```ts
enum Difficulty {
  Easy,
  Medium,
  Hard,
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

let tsInfo = {
  name: 'TypeScript',
  supersetOf: 'JavaScript',
  difficulty: Difficulty.Medium,
}

let difficulty: Difficulty = getProperty(tsInfo, 'difficulty') // OK
let name: string = getProperty(tsInfo, 'name') // OK
// let supersetof: string = getProperty(tsInfo, 'superset_of') // ❌ Argument of type '"superset_of"' is not assignable to parameter of type '"difficulty" | "name" | "supersetOf"'.ts(2345)
```
- 很明显通过使用泛型约束, 在编译阶段我们就可以提前发现错误, 大大提高了程序的健壮性和稳定性. 
