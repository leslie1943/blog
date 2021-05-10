// 泛型默认类型
interface Dictionary<T = any> {
  [key: string]: T
}

type StrDict = Dictionary<string>

type DictMember<T> = T extends Dictionary<infer V> ? V : never

type StrDictMember = DictMember<StrDict> // string

// ---------------

async function stringPromise() {
  return 'hello coder'
}

interface Person {
  name: string
  age: number
}

async function personPromise() {
  return { name: 'coder', age: 30 } as Person
}

type PromiseType<T> = (args: any[]) => Promise<T>
type UnPromisify<T> = T extends PromiseType<infer U> ? U : never

type extractStringPromise = UnPromisify<typeof stringPromise> // string
type extractPersonPromise = UnPromisify<typeof personPromise> // Person
