interface Length {
  length: number
}
function identity<T extends Length>(arg: T): T {
  console.info(arg.length)
  return arg
}

// identity(52) // Argument of type 'number' is not assignable to parameter of type 'Length'.ts(2345)
identity(`52`)

function identity2<T>(arg: T[]): T[] {
  console.info(arg.length)
  return arg
}
identity2([1, 2, 3]) // function identity2<number>(arg: number[]): number[]
identity2([`1`, `2`, `3`]) // function identity2<string>(arg: string[]): string[]

function identity3<T>(arg: Array<T>): Array<T> {
  console.info(arg.length)
  return arg
}

export {}
