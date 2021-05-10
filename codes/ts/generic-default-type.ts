interface A<T = string> {
  name: T
}

const strA: A = { name: 'coder' }
const numB: A<number> = { name: 111 }
const isC: A<boolean> = { name: true }
