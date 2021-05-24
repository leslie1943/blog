### TypeScript- 抽象类,接口,类类型

#### 🚀🚀🚀 抽象类
- `Abstract Class` 抽象类: 不能被实例化只能被继承实现
- 可以使用`抽象类`定义 `派生类` 需要实现的属性和方法
- <font color="pink">同时可以定义其他被继承的默认属性和方法</font>
```ts
// 🎃 定义抽象类
abstract class Adder {
  abstract x: number; // 定义需要实现的属性
  abstract y: number; // 定义需要实现的属性
  abstract add(): number; // 定义需要实现的方法

  displayName = "Adder"; // 定义其他被继承的默认属性

  addTwice(): number { // 定义其他被继承的默认方法
    return (this.x + this.y) * 2;
  }
}

// 🎃 派生类实现抽象类
class NumberAadder extends Adder {
  // 抽象属性-实现
  x: number;
  y: number;
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
  }
  // 抽象方法-实现
  add(): number {
    return this.x + this.y;
  }
}

const adder = new NumberAadder(1, 2);
adder.add(); // 派生类实现的方法
adder.displayName; // 抽象类默认属性
adder.addTwice(); // 抽象类默认方法
```

#### 🚀🚀🚀 接口
- 使用接口与使用抽象类相比,接口只能定义类成员的`类型`
```ts
interface Adder {
  x: number;
  y: number;
  add(): number;
  // 不能定义默认属性和方法
}

class NumberAadder implements Adder {
  // 抽象属性-实现
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  // 抽象方法-实现
  add(): number {
    return this.x + this.y;
  }
}
const adder = new NumberAadder(1, 2);
adder.add();
```

#### 🚀🚀🚀 类的类型
- 在定义了类的时候, 我们声明的`除`构造函数外所有属性,方法的类型就是这个特殊类型的成员
```ts
class Config {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const config: Config = {
  name: "ss",
};

// 以下定义均为错误
// const c2: Config = {
//   age: "ss", //   Object literal may only specify known properties, and 'age' does not exist in type 'A'.ts(2322)
// };

// const c3: Config = {
// Property 'name' is missing in type '{}' but required in type 'A'.ts(2741)
// };
```