// type Record<K extends string | number | symbol, T> = { [P in K]: T }

// <K, T>: K 是指属性的类型; T 是指属性的值类型 any指任意类型
// { [P in K]: T } : 属性名称是 string |number | symbol 之一(下面代码中的 string), 属性值是 T 类型(下面代码中的any)
interface Developer extends Record<string | number, any> {
  name: string
  age?: number
}

let developer: Developer = { name: 'coder', 1: '1' }
developer.age = 22
developer.city = 'Dalian'

// Record<K,T>中的 T 是 string, Value 只能是 string
interface Coder extends Record<string, string> {
  name: string
  age?: string // 只能是 string
}
let coder: Coder = { name: 'coder' }
// coder.age = 22 // Type 'number' is not assignable to type 'string'.ts(2322)
coder.age = `22`
