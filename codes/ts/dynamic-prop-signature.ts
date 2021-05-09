// let developer = {}
// developer.name = 'finder' // Property 'name' does not exist on type '{}'.ts(2339)

interface LooseObject {
  [key: string]: any
}

let developer: LooseObject = {}
developer.name = 'finder'

interface LooseStaticObject {
  name: string
  age?: number
  [key: string]: any
}
let coder: LooseStaticObject = { name: 'semlinker' }
coder.age = 30
coder.city = 'Dalian'

export {}
