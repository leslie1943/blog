### TypeScript: 如何为对象动态分配属性


- 在`JavaScript`中我们很容易给对象动态添加属性
```js
let developer = {}
developer.name = 'frontender'  
```
- 以上代码在 `JavaScript` 中可以正常运行, 但在 `TypeScript` 中, 编译器会提示以下异常信息
```bash
Property 'name' does not exist on type '{}'.ts(2339)
```

### 🚀🚀🚀 使用 索引签名
- `{}`类型表示一个没有包含成员的对象, 所以该类型没有包含`name`属性. 为了解决这个问题, 我们可以声明一个 `LooseObject`类型
```ts
interface LooseObject {
  [key: string]: any
}

let developer: LooseObject = {}
developer.name = 'finder'
```
- 该类型使用 `索引签名` 的形式描述 `LooseObject` 类型可以接收 `key` 类型是字符串, 值的类型是`any`类型的字段. 有了`LooseObject`类型之后, 我们就可以通过上述代码解决动态添加属性的问题

- 对于 `LooseObject` 类型来说, 它的约束是很宽松的. 在一些应用场景中, 我们除了希望能支持动态的属性之外, 也希望能够声明一些必选和可选的属性. 
- 比如对于一个表示开发者的 Developer 接口来说, 我们希望它的 name 属性是必填, 而 age 属性是可选的, 此外还支持动态地设置字符串类型的属性. 针对这个需求我们可以这样做
```ts
interface LooseStaticObject {
  name: string
  age?: number
  [key: string]: any
}

let coder: LooseStaticObject = { name: 'semlinker' }
coder.age = 30
coder.city = 'Dalian'

```

### 🚀🚀🚀 使用工具类型 Record 定义接口
- 其实除了使用 `索引签名` 之外, 我们也可以使用 `TypeScript` 内置的工具类型 `Record` 来定义 `Developer` 接口
```ts
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
// { [P in K]: T } : 属性名称是 string |number | symbol 之一(下面代码中的 string), 属性值是 T 类型(下面代码中的any)

// <K, T>: K 是指属性的类型; T 是指属性的值类型 any指任意类型
interface Developer extends Record<string, any> {
  name: string
  age?: number
}

let developer: Developer = { name: 'coder', 1: '1' }
developer.age = 22
developer.city = 'Dalian'

// Record<K,T>中的 💛 T 是 string, Value 只能是 string
interface Coder extends Record<string, string> {
  name: string
  age?: string // 只能是 string
}
let coder: Coder = { name: 'coder' }
// coder.age = 22 // Type 'number' is not assignable to type 'string'.ts(2322)
coder.age = `22`
```
