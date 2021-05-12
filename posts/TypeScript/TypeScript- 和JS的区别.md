#### TypeScript 和 JavaScript
- TypeScript 是JavaScript的超集
- TypeScript 在JavaScript的基础上添加类型系统以及完全的支持ES6+语法
- Angular, Vue3.0将直接支持TypeScript
- TypeScript 需要编译,JavaScript基本直接被浏览器解析执行
​	  
#### TypeScript 你都用过哪些类型
- 基本类型,数组类型,函数类型
- 元组类型
- 枚举类型

#### TypeScript 中type和interface的区别
- 都允许拓展
```js
// interface
interface Name { 
    name: string; 
}
interface User extends Name { 
    age: number; 
}

// type
type Name = { 
    name: string; 
}
type User = Name & { age: number };

// interface  扩展 type
type Name = { 
    name: string; 
}
interface User extends Name { 
age: number; 
}

// type 扩展 interface
interface Name { 
    name: string; 
}
type User = Name & { 
    age: number; 
}
```
- type 可以声明基本类型别名,联合类型,元组等类型, interface只能描述一个对象或者函数
- type 语句中还可以使用 typeof 获取实例的 类型进行赋值
- interface 能够声明合并, type 不行
```js
interface User {
    name: string
    age: number
}
 
interface User {
    sex: string
}
```

### 类型注解
- 语法: 类型注解的语法由一个冒号`:`和某种具体类型`Type`组成,示例 `:Type`
```ts
// :string 就是  实体greeting 的类型注解
const greeting: string = 'Hello World!'
``` 