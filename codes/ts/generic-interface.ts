interface Identities<V, M> {
  value: V
  message: M
}

function identity<T, U>(value: T, message: U): Identities<T, U> {
  console.info(`${value}: ${typeof value}`)
  console.info(`${message}: ${typeof message}`)
  let identities: Identities<T, U> = {
    value,
    message,
  }
  return identities
}
console.info(identity<Number, String>(68, 'finder'))

// demo
function test<T, U>(a: T, b: U): Identities<T, U> {
  console.info(`${a}: ${typeof a}`)
  console.info(`${b}: ${typeof b}`)
  let res: Identities<T, U> = {
    value: a,
    message: b,
  }
  return res
}

console.info(test('s', 'b'))

export {}
