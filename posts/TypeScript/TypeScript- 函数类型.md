### TypeScript- 函数类型
- TypeScript 函数类型中的 `=>` 用来表示 函数的定义
- `左侧是`:  `函数的参数类型`
- `右侧是`:  `函数的返回值类型`
 ```ts
    // 🎃🎃 使用类型别名 定义 函数类型
    type Adder = (a: number, b: number) => number;
    // ✅✅ ES 的实现
    const add: Adder = (a: number, b: number) => a + b;
    // 🎃🎃 使用接口 定义 函数类型
    interface Accumulator {
        (a: number, b: number): number;
    }
    // ✅✅ ES 的实现
    const accumulator: Accumulator = (a: number, b: number) => a + b;
```
- `ES6`中的 `=>` 是`函数的实现`
```ts
    // ✅✅
    const add: Adder = (a, b) => a + b;
```


#### 🚀🚀🚀 DEMO: 用【接口】定义方法
```ts
// 🎃🎃 定义接口
interface Calc {
  add: (a: number | undefined, b: number | undefined) => number;
  del: (a: number | undefined, b: number | undefined) => number;
  multiple: (a: number | undefined, b: number | undefined) => number;
  mod: (a: number | undefined, b: number | undefined) => number;
  test: () => number;
}

// 接口是用来实现(implements)
class Calculator implements Calc {
  // 成员变量
  a: number = 0;
  b: number = 0;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  add(): number {
    return this.a + this.b;
  }

  del(): number {
    return this.a - this.b;
  }
  multiple(): number {
    return this.a * this.b;
  }
  // 可推导的, 可省略返回类型
  mod() {
    return this.a / this.b;
  }
  test(): number {
    return this.a + this.b;
  }
}

const calc = new Calculator(1, 2);
console.info(calc.add());
console.info(calc.del());
console.info(calc.multiple());
console.info(calc.mod());

// 用接口定义方法
interface Add {
  (a: number, b: number): number;
}
interface Reduce {
  (a: number, b: number): number;
}
// 实现方法-使用箭头函数实现
const adder: Add = (a: number, b: number): number => a + b;
adder(100, 200);
// 实现方法-使用方法定义实现
const reduce: Reduce = function (a: number, b: number): number {
  return a - b;
};

reduce(2, 3);

export {};
```

#### 🚀🚀🚀 DEMO 【类型别名】 定义一个/多个方法
```ts
// 使用类型别名 定义 单个函数类型
type Adder = (a: number, b: number) => number;
const add: Adder = (a, b) => a + b;

// 使用类型别名 定义 多个函数类型
type Calc = {
    add: (a: number | undefined, b: number | undefined) => number;
    del: (a: number | undefined, b: number | undefined) => number;
    multiple: (a: number | undefined, b: number | undefined) => number;
    mod: (a: number | undefined, b: number | undefined) => number;
    test: () => number;
  };

  class Calculator implements Calc {
    a: number = 0;
    b: number = 0;
    constructor(a: number, b: number) {
      this.a = a;
      this.b = b;
    }

    add(): number {
      return this.a + this.b;
    }

    del(): number {
      return this.a - this.b;
    }
    multiple(): number {
      return this.a * this.b;
    }
    mod() {
      return this.a / this.b;
    }
    test(): number {
      return this.a + this.b;
    }
  }
  const calc = new Calculator(1, 2);
  console.info(calc.add());
  console.info(calc.del());
  console.info(calc.multiple());
  console.info(calc.mod());
```

#### 🚀🚀🚀 函数类型 中的 剩余参数
- ES6 中, JS支持函数参数的剩余参数, 可以把多个参数收集到一个变量中
```ts
// ES6 中, JS支持函数参数的剩余参数, 可以把多个参数收集到一个变量中
  function acc(...nums: Array<number | string>) {
    return nums.reduce((a, b) => Number(a) + Number(b), 0);
  }
  function sum(...nums: (number | string)[]) {
    return nums.reduce<number>((a, b) => Number(a) + Number(b), 0);
  }

  sum(1, 2, 3);
  sum(2, 3, 4);
  sum(1, 2, "3");
```

#### 🚀🚀🚀 函数中的this => 链式中的this
```ts
class Container {
    private val: number;
    constructor(val: number) {
      this.val = val;
    }
    // 函数类型: => 左侧是  函数的参数类型
    // 函数类型: => 右侧是  函数的返回值类型
    // 🎃 cb是一个函数,其参数 x 是 number 类型, 返回类型 number
    map(cb: (x: number) => number): this {
      this.val = cb(this.val);
      return this;
    }

    log(): this {
      console.info(this.val);
      return this;
    }
  }

  const instance = new Container(1);
  // 返回的一直是 this, 可以一直调用
  instance
    .map((x) => x + 1)
    .log()
    .map((x) => x * 3)
    .log();
```
