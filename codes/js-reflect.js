var name = 'Global Name'

console.info(' ------------- Function.prototype.apply -------------')
// -------------- Function.prototype.apply
var leslie = {
  name: 'Leslie',
  say() {
    console.info(this.name)
  },
}

var mark = {
  name: 'Mark',
}

leslie.say() // Leslie
leslie.say.apply(mark) // Mark

console.info(' ------------- Reflect.apply -------------')

// -------------- Reflect.apply
/**
 * Reflect.apply(target, thisArgument, argumentsList)
 * target: 目标函数
 * thisArgument: target函数调用时绑定的this对象
 * argumentsList: target函数调用时传入的实参列表，该参数应该是一个类数组的对象。

 */
console.info(Reflect.apply(Math.floor, undefined, [1.75])) // 1

console.info(Reflect.apply(leslie.say, undefined, [])) // Global Name
console.info(Reflect.apply(leslie.say, this, [])) // Global Name
console.info(Reflect.apply(leslie.say, leslie, [])) // Leslie
console.info(Reflect.apply(leslie.say, mark, [])) // Mark
