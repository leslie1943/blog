### TypeScript- TS中实现函数类型的两种方式

- 关于`函数类型`, 详情见文章 [TypeScript- TS中实现函数类型的两种方式](https://github.com/leslie1943/blog/issues/303)

#### 🚀🚀🚀 实现函数类型的两种方式 - 1: 箭头函数
```ts
 // 用接口定义方法
  interface Add {
    (a: number, b: number): number;
  }
  // 实现方法-使用箭头函数实现
  const adder: Add = (a: number, b: number): number => a + b;
  adder(100, 200);
```

#### 🚀🚀🚀 实现函数类型的两种方式 - 2: 函数定义
```ts
 // 用接口定义方法
  interface Reduce {
    (a: number, b: number): number;
  }
  // 实现方法- 使用函数定义实现
  const reduce: Reduce = function (a: number, b: number): number {
    return a - b;
  };
  reduce(2, 3);
```