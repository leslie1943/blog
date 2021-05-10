interface Person {
  name: string
  age: number
  location: string
}

type K1 = keyof Person // 'name' | 'age' | 'location'
type K2 = keyof Person[] // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person } // string | number

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const person: Person = {
  name: 'su',
  age: 22,
  location: 'dalian',
}

console.info('getProperty(person, "age")', getProperty(person, 'age')) // function getProperty<Person, "age">(obj: Person, key: "age"): number
console.info('getProperty(person, "name")', getProperty(person, 'name')) // function getProperty<Person, "name">(obj: Person, key: "name"): string

export {}
