// 🚀🚀🚀 Step - 1
function identity1(value) {
  return value
}
console.info(identity1(1)) // 1

// 🚀🚀🚀 Step - 2
function identity2(value: Number): Number {
  return value
}
console.info(identity2(1)) // 1

// 🚀🚀🚀 Step - 3
function identity3<T>(value: T): T {
  return value
}
console.info(identity3(1)) // 1

// 🚀🚀🚀 Step - 4
function identity4<T, U>(value: T, message: U): T {
  console.info(message)
  return value
}
console.log(identity4<Number, string>(68, 'Semlinker'))

// 🚀🚀🚀 Step - 5
function identity5<T, U>(value: T, message: U): T {
  console.info(message)
  return value
}
console.log(identity5(68, 'Semlinker'))

// 🚀🚀🚀 Step - 6
function identity6<T, U>(value: T, message: U): [T, U] {
  console.info(message)
  return [value, message]
}
console.log(identity6(68, 'Semlinker'))

export {}
