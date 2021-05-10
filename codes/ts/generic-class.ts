interface PersonInterface<U> {
  value: U
  getIdentity: () => U
}

class IdentityClass<T> implements PersonInterface<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  getIdentity(): T {
    return this.value
  }
}

const p1 = new IdentityClass<string>('War1')
console.info(`p1 value ${p1.value}`) // p1 value War1
console.info(`p1.getIdentity()  ${p1.getIdentity()}`) // p1.getIdentity()  War1

const p2 = new IdentityClass<number>(1943)
console.info(`p2 value ${p2.value}`) // p2 value 1943
console.info(`p2.getIdentity()  ${p2.getIdentity()}`) // p2.getIdentity()  1943

export {}
