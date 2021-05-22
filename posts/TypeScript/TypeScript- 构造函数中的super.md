### TypeScript- 构造函数中的super
- `父类` | `基类` | `超类`
```ts
// 基类 | 超类 | 父类
class Animal {
  type = "Animal";
  weight: number;
  // 父类的构造函数, 接收一个 number 型的形参
  constructor(weight: number) {
    this.weight = weight;
  }
  say(name: string) {
    console.info(`I'm ${name}`);
  }
}
```
- `派生类` | `子类`
- 派生类如果包含一个构造函数, 要必须调用 `super` 方法
```ts
class Dog extends Animal {
  name: string;
  // constructor(name:string){
  //    this.name = name;
  // }
  // ❌ 以上(constructor)代码会报错 Constructors for derived classes must contain a 'super' call.ts(2377)
  // ✅ 正确的是下面的代码
  constructor(name: string, weight: number) {
    /**
     * super函数 要调用 基类的构造函数
     * constructor Animal(weight: number): Animal
     */
    super(weight); // 🎃 必须有 super 方法
    /**
     * 🎃 这里的 super函数会调用基类的构造函数
     * 🎃 并且需要满足基类构造函数的参数要求
     */
    this.name = name;
  }

  bark() {
    console.info("Woof!Woof!");
  }
}
const dog = new Dog("Snoopy", 20);
console.info(dog.type); // Animal
dog.bark(); // Woof!Woof!
dog.say("Snoopy"); // I'm Snoopy
```

#### 总结
1. `子类|派生类` 在显式的实现`构造函数`的时候, 必须调用 `super` 方法
2. 子类构造函数中的 `super()`要调用`基类的构造函数`,所以要满足基类的构造函数的`形参要求`