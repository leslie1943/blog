class FirstClass {
  id: number | undefined
}

class SecondClass {
  name: string | undefined
}

class GenericCreator<T> {
  // create(): T {
  //   return new T()
  // }

  create<T>(c: { new (a: number): T }, num: number): T {
    return new c(num)
  }
}

const creator1 = new GenericCreator<FirstClass>()
const firstClass: FirstClass = creator1.create(FirstClass, 1)
console.info('firstClass.id', firstClass.id)

export {}
