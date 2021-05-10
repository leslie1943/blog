// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Exclude from T those types that are assignable to U
 */
// type Exclude<T, U> = T extends U ? never : T

type T0 = Exclude<'a' | 'b' | 'c', 'a'> // "b"|"c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> //"c"
type T2 = Exclude<string | number | (() => void), Function> // string | number

interface Todo {
  title: string
  desc: string
  status: boolean
}
interface Status {
  status: boolean
}

// type StatusOnly = 'title' | 'desc'
type StatusOnly = Exclude<keyof Todo, keyof Status>
const test1: StatusOnly = 'title'
const test2: StatusOnly = 'desc'

export {}
