### TypeScript- # 和 private 的区别

- 在 TypeScript 3.8 版本就开始支持 ECMAScript 私有字段, 使用方式如下
```ts
class Person {
  #name: string; // 私有变量

  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`My name is ${this.#name}`);
  }
}

const p1 = new Person("leslie");
p1.greet();
// p1.#name; // Property '#name' is not accessible outside class 'Person' because it has a private identifier.ts(18013)
```
- 与常规属性 (甚至使用 private 修饰符声明的属性)不同,私有字段要牢记以下规则:
1. 私有字段以 `#` 字符开头, 有时我们称之为私有名称;
2. 每个私有字段名称都唯一地限定于其包含的类;
3. 不能在私有字段上使用 `TypeScript` 可访问性修饰符(如 `public` 或 `private`);
4. 私有字段不能在包含的类之外访问, 甚至不能被检测到

#### 使用 # 定义的私有字段与 private 修饰符定义字段区别呢
```ts
class Man {
  constructor(private name: string) {}
}

const man = new Man("leslie");
man.name; // Property 'name' is private and only accessible within class 'Man'.ts(2341)
```
- 在上面代码中, 我们创建了一个 `Man` 类, 该类中使用 `private` 修饰符定义了一个私有属性 `name`, 接着使用该类创建一个 `man` 对象, 然后通过 `man.name` 来访问 `man` 对象的私有属性, 这时 `TypeScript` 编译器会提示以下异常
```bash
    # Property 'name' is private and only accessible within class 'Person'.(2341)
```
- 那如何解决这个异常呢? 当然你可以使用类型断言把 `man` 转为 `any` 类型
```ts
console.log((man as any).name);
```
- 通过这种方式虽然解决了 `TypeScript` 编译器的异常提示, 但是在运行时我们还是可以访问到 `Person` 类内部的私有属性, 为什么会这样呢? 我们来看一下编译生成的 `ES5` 代码, 也许你就知道答案了
```js
var Man = /** @class */ (function () {
    function Man(name) {
      this.name = name;
    }
    return Man;
}());

var man = new Man("Leslie");
console.log(man.name);
```
- 在 `TypeScript 3.8` 以上版本通过 `#` 号定义的私有字段编译后会生成什么代码:
```ts
class Person {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}
```
- 以上代码目标设置为 `ES2015`, 会编译生成以下代码:
```js
"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) 
  || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};

var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) 
  || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};

var _name;
class Person {
    constructor(name) {
      _name.set(this, void 0);
      __classPrivateFieldSet(this, _name, name);
    }
    greet() {
      console.log(`Hello, my name is ${__classPrivateFieldGet(this, _name)}!`);
    }
}
_name = new WeakMap();

```
- 通过观察上述代码, 使用 `#` 号定义的 `ECMAScript` 私有字段, 会通过 `WeakMap` 对象来存储, 同时编译器会生成 `__classPrivateFieldSet` 和 `__classPrivateFieldGet` 这两个方法用于设置值和获取值.
- 
