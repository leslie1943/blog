enum Difficulty {
  Easy,
  Medium,
  Hard,
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

let tsInfo = {
  name: 'TypeScript',
  supersetOf: 'JavaScript',
  difficulty: Difficulty.Medium,
}

let difficulty: Difficulty = getProperty(tsInfo, 'difficulty') // OK
console.info('difficulty', difficulty)

let name: string = getProperty(tsInfo, 'name') // OK
// let supersetof: string = getProperty(tsInfo, 'superset_of') // Argument of type '"superset_of"' is not assignable to parameter of type '"difficulty" | "name" | "supersetOf"'.ts(2345)

export {}
