function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayName = function () {
  console.info(this.name)
}

const p1 = new Person('leslie', 12)
console.info(p1)
p1.sayName()

function Test(name) {
  this.name = name
  console.info(this)

  return { age: 25 }
}

const t = new Test('leslie')
console.info(t)
console.info(t.name)
