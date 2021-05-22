### TypeScript- 联合类型和类型别名

#### 🚀🚀🚀 联合类型
- 联合类型通常与 `null` 或 `undefined` 一起使用
```ts
const sayHello = (name:string|undefined) => {
    /* */
}
```
- 这里 `name` 的类型是 `string` | `undefined` 意味着可以将 `string` 或 `undefined` 的值传递给 `sayHello` 函数.
```ts
sayHello('Leslie')
sayHello(undefined)
```
- 通过这个示例, 你可以凭直觉知道类型 `A` 和类型 `B` 联合后的类型是同时接受 `A` 和 `B` 值的类型. 此外, 对于联合类型来说, 你可能会遇到以下的用法:
```ts
const num: 1 | 2 = 1
type isMan = true | false
type EventNames = 'click' | 'scroll' | 'mousemove'
```
- 以上示例中的`1`,`2`或者`click`,`scroll`,`mousemove`被称为字面量类型, 用来约束取值只能是某几个值中的一个


#### 🚀🚀🚀 可辨识联合
- `TypeScript` 可辨识联合(`Discriminated Unions`)类型, 也称为`代数数据类型`或`标签联合类型`.它包含 3 个要点: `可辨识`, `联合类型` 和 `类型守卫`.
- 这种类型的本质是结合`联合类型`和`字面量类型`的一种类型保护方法. 如果`一个类型`是`多个类型`的`联合类型`, 且`多个类型`含有一个<font color="red">公共属性</font>, 那么就可以利用这个<font color="red">公共属性</font>, 来创建不同的类型保护区块. 
1. 💛💛💛 可辨识 💛💛💛
- `可辨识要求联合类型`中的每个元素都含有一个`单例类型`属性,比如:
```ts
enum CarTransmission {
  Automatic = 200,
  Manual = 300
}

interface Motorcycle {
  vType: "motorcycle"; // discriminant
  make: number; // year
}

interface Car {
  vType: "car"; // discriminant
  transmission: CarTransmission
}

interface Truck {
  vType: "truck"; // discriminant
  capacity: number; // in tons
}
```
- 在上述代码中, 我们分别定义了 `Motorcycle` 、 `Car` 和 `Truck` 三个接口, 在这些接口中都包含一个 `vType` 属性, 该属性被称为`可辨识的属性`, 而其它的属性只跟特性的接口相关.

2. 💛💛💛 联合类型 💛💛💛
- 基于前面定义了三个接口, 我们可以创建一个 `Vehicle` 联合类型:
```ts
type Vehicle = Motorcycle | Car | Truck;
```
- 现在我们就可以开始使用 `Vehicle` 联合类型, 对于 `Vehicle` 类型的变量, 它可以表示不同类型的车辆.

3. 💛💛💛 类型守卫 💛💛💛
- 下面我们来定义一个 `evaluatePrice` 方法, 该方法用于根据车辆的类型、容量和评估因子来计算价格, 具体实现如下:
```ts
const EVALUATION_FACTOR = Math.PI; 

function evaluatePrice(vehicle: Vehicle) {
  return vehicle.capacity * EVALUATION_FACTOR;
}

const myTruck: Truck = { vType: "truck", capacity: 9.5 };
evaluatePrice(myTruck);

```
- 对于以上代码, `TypeScript` 编译器将会提示以下错误信息:
```ts
// Property 'capacity' does not exist on type 'Vehicle'.
// Property 'capacity' does not exist on type 'Motorcycle'.
```
- 原因是在 `Motorcycle` 接口中, 并不存在 `capacity` 属性, 而对于 `Car` 接口来说, 它也不存在 `capacity` 属性. 那么, 现在我们应该如何解决以上问题呢? 这时, 我们可以使用类型守卫. 下面我们来重构一下前面定义的 `evaluatePrice` 方法, 重构后的代码如下：
```ts
function evaluatePrice(vehicle: Vehicle) {
  switch(vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "truck":
      return vehicle.capacity * EVALUATION_FACTOR;
    case "motorcycle":
      return vehicle.make * EVALUATION_FACTOR;
  }
}
```
- 在以上代码中, 我们使用 `switch` 和 `case` 运算符来实现类型守卫, 从而确保在 `evaluatePrice` 方法中, 我们可以安全地访问 `vehicle` 对象中的所包含的属性, 来正确的计算该车辆类型所对应的价格.


#### 🚀🚀🚀 类型别名
- 类型别名用来给一个类型起个新名字
```ts
type Message = string | string[];

let greet = (message: Message) => {
  // ...
};
greet("ss"); // OK
greet([`1`, `2`]); // OK
```
