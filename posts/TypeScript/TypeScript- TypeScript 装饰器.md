## TypeScript- TypeScript 装饰器

### 🚀🚀🚀 什么是装饰器
- 它是一个表达式
- 该表达式被执行后, 返回一个函数
- 函数的入参分别为`target`,`name`和`descriptor`
- 执行该函数后, 可能返回`descriptor`用于配置`target`对象
  
### 🚀🚀🚀 装饰器分类
- 类装饰器(`class decorators`)
- 属性装饰器(`Property decorators`)
- 方法装饰器(`Method decorators`)
- 参数装饰器(`Parameter decorators`)

- 需要注意的是, 若要启用实验性的装饰器特性, 你必须在命令行或 `tsconfig.json` 里启用 `experimentalDecorators` 编译器选项
```bash
    tsc --target ES5 --experimentalDecorators
```

### 🚀🚀🚀 类装饰器
- 类装饰器声明:
```ts
    declare type ClassDecorator = <TFunction extends Function>(
        target: TFunction
    ) => TFunction | void
```
- 类装饰器顾名思义, 就是用来装饰类的. 它接收一个参数: `target:TFunction` - 被装饰器的类
- 举个例子
```ts
/**
 * @param target - 被装饰器的类
 */
function Greeter(target: Function): void {
 target.prototype.owner = "SUZHEN";
  target.prototype.greet = function (): void {
    console.info("Hello Leslie!");
  };
}

@Greeter
class Greeting {
  constructor() {}
}

const greeting = new Greeting();
(greeting as any).greet();
(greeting as any).owner; // SUZHEN
```
- 上面的例子中, 我们定义了 `Greeter` 类装饰器, 同时我们使用了 `@Greeter` 语法糖, 来使用装饰器.
- 那么问题来了, 例子中总是输出 `Hello Leslie!` , 能自定义输出自定义内容吗? => 答案是可以的.
- 返回一个函数, 让函数接收外部参数
```ts
 /**
   * @param target - 被装饰器的类
   */
  function Greeter(msg: string) {
    return function (target: Function) { /* 🎃 返回一个函数, 让函数接收外部参数 */
      target.prototype.greet = function (): void {
        console.info(msg);
      };
    };
  }

  @Greeter("Hello TypeScript")
  class Greeting {
    constructor() {}
  }

  const g1 = new Greeting();
  (g1 as any).greet();
```

### 🚀🚀🚀 属性装饰器
- 属性装饰器声明
```ts
declare type PropertyDecorator = (target:Object,
    propertKey:string|symbol) => void
```
- 属性装饰器顾名思义, 用来装饰类的属性.它接收两个参数:
1. `target:Object` - 被装饰的类
2. `propertKey:string|symbol` - 被装饰类的属性名
- 例子如下:
```ts
function logProperty(target: any, key: string) {
  delete target[key];

  const backingField = "_" + key;

  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true,
  });

  // property getter
  const getter = function (this: any) {
    const currVal = this[backingField];
    console.log(`Get: ${key} => ${currVal}`);
    return currVal;
  };

  // property setter
  const setter = function (this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    this[backingField] = newVal;
  };

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}
class Person {
  @logProperty
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const p1 = new Person("leslie");
p1.name = "suzhen";
```
- 以上代码我们定义了一个 `logProperty` 函数, 来跟踪用户对属性的操作, 当代码成功运行后, 在控制台会输出以下结果:
```ts
// 代码运行成功: 
// Set: name => leslie
// Set: name => suzhen
```

### 🚀🚀🚀 方法装饰器
- 方法装饰器声明
```ts
declare type MethodDecorator = <T>(target: Object,propertyKey:string | symbol, descriptor: TypePropertyDescript<T>) => TypedPropertyDescriptor<T> | void
```
- 方法装饰器顾名思义, 用来装饰类的方法. 它接收三个参数:
1.` target: Object` - 被装饰的类
2. `propertyKey: string | symbol` - 方法名
3. `descriptor: TypePropertyDescript` - 属性描述符
- 见例子:
```ts
function log(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  let originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("wrapped function: before invoking " + propertyKey);
    let result = originalMethod.apply(this, args);
    console.log("wrapped function: after invoking " + propertyKey);
    return result;
  };
}

class Task {
  @log
  runTask(arg: any): any {
    console.info("runTask invoked, args: " + arg);
    return "finished";
  }
}

let task = new Task();
let result = task.runTask("learn ts");
console.info("result:" + result);
```

### 🚀🚀🚀 参数装饰器
- 参数装饰器声明
```ts
declare type ParameterDecorator = (target: Object, propertyKey:string|symbol, parameterIndex: number) => void
```
- 参数装饰器顾名思义，是用来装饰函数参数，它接收三个参数：
1. `target: Object` - 被装饰的类
2. `propertyKey: string | symbol` -  方法名
3. `parameterIndex: number` - 方法中参数的索引值
- 见例子:
```ts
function Log(target: Function, key: string, parameterIndex: number) {
  let functionLogged = key || target.prototype.constructor.name;
  console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
	been decorated`);
}

class Greeter {
  greeting: string;
  constructor(@Log phrase: string) {
    this.greeting = phrase;
  }
}
```
- 以上代码成功运行后，控制台会输出以下结果：
```ts
// "The parameter in position 0 at Greeter has been decorated" 
```