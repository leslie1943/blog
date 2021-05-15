### TypeScript: interfaces 与 type

#### 🚀🚀🚀 1. Objects / Functions
- 接口和类型别名都可以用来描述对象的形状或函数签名
- 使用接口定义
```ts
    // 使用接口
    interface Point{
        x: number
        y: number
    }
    
    interface SetPoint {
        (x:number, y:number): void
    }
```
- 使用类型别名定义
```ts
    type Point = {
        x: number
        y: number
    }

    type SetPoint = (x: number, y: number) => void;
```

#### 🚀🚀🚀 2. Other Types
- 与接口类型不同, 类型别名可以用于一些其他类型, 比如原始类型, 联合类型和元组
```ts
    // 原始类型
    type Name = string
    // const name: Name = 22
    const name: Name = 'sss'

    // Object
    type PartialPointX = { x: number }
    type PartialPointY = { y: number; z: number }
    // Union Object
    type PartialPoint = PartialPointX | PartialPointY
    const pointx: PartialPointX = { x: 1 }
    const pointy: PartialPointY = { y: 1, z: 88 }
    const pointer: PartialPoint = { x: 100, y: 200, z: 300 }

    // Tuple
    type Data = [number, string]
    const dataArr: Array<Data> = [[1, 'ss']]
    const data: Data = [1, 'ss']
```

#### 🚀🚀🚀 6.3 Extend
- 接口和类型别名都能够被扩展, 但语法有所不同. 此外, 接口和类型别名不是互斥的.
- ✅ 接口可以扩展类型别名
- ❌ 类型别名不能扩展接口
1. 🎃 `interface extends interface`
```ts
    interface PartialPointX {
        x: number
    }

    interface Point extends PartialPointX {
        y: number
    }

    const point: Point = { x: 11, y: 22 }
```
2. 🎃 `Type Alias extends type alias`
```ts
    type FirstName = { first: string }
    type FullName = FirstName & { last: string }

    const fullName: FullName = { first: 'su', last: 'zhen
```
3. 🎃 `interface extends type alias`
```ts
    type PartialPointX = {
        x: number
    }

    interface Point extends PartialPointX {
        y: number
    }

    const point: Point = {
        x: 1,
        y: 2,
    }
```
4. 🎃 `type alias extends interface`
```ts
    interface FirstName {
        first: string
    }

    type FullName = FirstName & { last: string }
        const name: FullName = {
        first: 'su',
        last: 'zhen',
    }
```
- 接口扩展的时候使用 `extends`
- 类型别名扩展的时候使用 `&`

#### 🚀🚀🚀 6.4 Implements
- 类可以以相同的方式实现接口或类型别名 ✅✅✅
- 但类不能实现使用类型别名定义的联合类型 ❌❌❌
```ts
interface Point {
    x: number
    y: number
  }

  class SomePoint implements Point {
    x = 0
    y = 0
  }

  type Point2 = {
    x: number
    y: number
  }
  class SomePoint2 implements Point2 {
    x = 0
    y = 0
  }

  type PartialPoint = { x: number } & { y: number }

  // A class can only implement an object type or
  // intersection of object types with statically known members.ts(2422)
  // class SomePartialPoint implements PartialPoint {} // Error ❌
```

#### 🚀🚀🚀 6.5 Declaration merge
- 接口可以定义多次, 自动合并到单个接口中
```ts
interface Point {
  x: number
}

interface Point {
  y: number
}

interface Point {
  y: number
}

interface Point {
  z: number
}

const point: Point = {
  x: 1,
  y: 2,
  z: 3,
}
```
- 类型别名只允许定义一次
```ts
// Duplicate identifier 'Name'.ts(2300)
// type Name = {
//   first: string
// }

// type Name = {
//   last: string
// }
```