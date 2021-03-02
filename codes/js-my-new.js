function mynew(Func, ...args) {
  // 1-创建一个新对象
  const obj = {}
  // 2-新对象的原型 指向 构造函数的原型对象
  obj.__proto__ = Func.prototype
  // 3-将构造函数的this指向新对象
  let result = Func.apply(obj, args)
  // 4-根据返回值判断
  return result instanceof Object ? result : obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.say = function () {
  console.log(this.name)
}

let p = mynew(Person, 'tom', 22)
console.info(p)
p.say()
