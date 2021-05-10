## TypeScript-泛型-5-泛型工具类型
- 为了方便开发者 `TypeScript` 内置了一些常用的工具类型, 比如 `Partial`, `Required`, `Readonly`, `Record` 和 `ReturnType` 等. 出于篇幅考虑, 这里我们只简单介绍其中几个常用的工具类型. 


### 🚀🚀🚀 Partial
- `Partial<T>`的作用就是将某个类型里的属性全部变为可选项`?`
```ts
type Partial<T>{
    [P in keyof T]?: T[P]
}
```
- 以上代码中, 首先通过 keyof T 拿到 T 的所有属性名. 然后使用`in`进行遍历, 将值赋给`P`, 然后通过`T[P]`取得相应的属性值. 中间的`?`号用于将所有属性变为可选
```ts

interface Todo {
  title: string
  desc: string
}

function updateTodo(todo: Todo, filedsToUpdate: Partial<Todo>) {
  return { ...todo, ...filedsToUpdate }
}

const todo1 = {
  title: 'test title 1',
  desc: 'test desc 1',
}

const todo2 = updateTodo(todo1, { desc: 'updated desc' })
console.info('todo2', todo2)
```
- 在上面的 `updateTodo` 方法中, 我们利用 `Partial<T>` 工具类型, 定义 `filedsToUpdate` 的类型为` Partial<Todo>`也就是:
```ts
interface TodoPartial {
  title?: string | undefined
  desc?: string | undefined
}
```


### 🚀🚀🚀 Record
- `Record<K extends keyof any, T>` 的作用将`K`中所有的属性转化为 `T`类型
```ts
// 定义
/**
 * node_modules/typescript/lib/lib.es5.d.ts
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

```ts
// 这个代表 Record 里 的 T
interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

// type Page 的 3个属性: home, about, contact  ===> 分别转化为 PageInfo 类型
const x: Record<Page, PageInfo> = {
  about: { title: 'about' },
  home: { title: 'home' },
  contact: { title: 'contact' },
}
```

### 🚀🚀🚀 Pick
- `Pick<T, K extends keyof T>` 的作用是将某个类型中的子属性挑出来, 变成包含这个类型部分属性的子类型.
```ts
// 定义
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

- demo
```ts
interface Todo {
  title: string
  desc: string
  finished: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'finished'>

interface TodoShow extends Pick<Todo, 'title' | 'finished'> {}

const todo1: TodoPreview = {
  title: 'Clean room',
  finished: true,
}

const todo2: TodoShow = {
  title: 'Coding',
  finished: true,
}
```

### 🚀🚀🚀 Exclude
-` Exclude<T, U>` 的作用是将某个类型中属于另一个的类型移除掉。
```ts
// 定义
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```
- 如果 `T` 能赋值给 `U` 类型的话, 那么就会返回 `never` 类型, 否则返回 `T` 类型。最终实现的效果就是将 `T` 中某些属于 `U` 的类型移除掉。

```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'> // "b"|"c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> //"c"
type T2 = Exclude<string | number | (() => void), Function> // string | number

interface Todo {
  title: string
  desc: string
  status: boolean
}
interface Status {
  status: boolean
}

// type StatusOnly = 'title' | 'desc'
type StatusOnly = Exclude<keyof Todo, keyof Status>
const test1: StatusOnly = 'title'
const test2: StatusOnly = 'desc'
```

### 🚀🚀🚀 ReturnType
- `ReturnType<T>` 的作用是用于获取函数 T 的返回类型
```ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

```ts
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T4 = ReturnType<any>; // any
type T5 = ReturnType<never>; // any
type T6 = ReturnType<string>; // Error
type T7 = ReturnType<Function>; // Error
```