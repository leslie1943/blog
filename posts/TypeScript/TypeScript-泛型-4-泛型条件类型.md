## TypeScript-泛型-4-泛型条件类型

### 🚀 泛型条件类型
- 在 `TypeScript 2.8` 中引入了条件类型, 使得我们可以根据某些条件得到不同的类型, 这里所说的条件是类型兼容性约束.尽管以上代码中使用了 `extends` 关键字, 也不一定要强制满足继承关系, 而是检查是否满足结构兼容性.
- 条件类型会以一个条件表达式进行类型关系检测, 从而在两种类型中选择其一:
```ts
T extends U ? X : Y
```
- 以上的表达式的意思是: 若 `T` 能够赋值给 `U`, 那么类型是 `X`, 否则为 `Y`. 在条件类型表达式中, 我们通常还会结合`infer`关键字, 实现类型抽取
```ts
interface Dictionary<T = any> {
  [key: string]: T
}
type StrDict = Dictionary<string>
type DictMember<T> = T extends Dictionary<infer V> ? V : never
type StrDictMember = DictMember<StrDict>
```
- 上面的示例中, 当类型`T`满足`T extends Dictionary`约束时, 我们会用`infer`关键字声明一个类型变量`V`, 并返回该类型, 否则返回`never`类型

```bash
在 `TypeScript` 中, `never` 类型表示的是哪些用不存在的值的类型. 例如: `never` 类型是那些总是会抛出异常活根本不会有返回值的函数表达式或箭头函数表达式的返回值类型.

另外, 需要注意的是, 没有类型是`never`的子类型或可以赋值给`never`类型(除了never本身).即使`any`也不能赋值给 never
```
- 除了上述的应用外, 利用条件类型和 infer 关键字, 我们还可以方便地实现获取 Promise 对象的返回值类型, 比如：
```ts
async function stringPromise() {
  return 'hello coder'
}

interface Person {
  name: string
  age: number
}

async function personPromise() {
  return { name: 'coder', age: 30 } as Person
}

type PromiseType<T> = (args: any[]) => Promise<T>

type UnPromisify<T> = T extends PromiseType<infer U> ? U : never

type extractStringPromise = UnPromisify<typeof stringPromise> // string
type extractPersonPromise = UnPromisify<typeof personPromise> // Person

```