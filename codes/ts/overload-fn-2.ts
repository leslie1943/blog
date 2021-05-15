type StringNumber = string | number

class Calculator {
  add(a: number, b: number): number
  add(a: string, b: string): string
  add(a: string, b: number): string
  add(a: number, b: string): string
  add(a: StringNumber, b: StringNumber) {
    if (typeof a === 'string' || typeof b === 'string') {
      return a.toString() + b.toString()
    }
    return a + b
  }
}

const calculator = new Calculator()
const result = calculator.add('sz', ' leslie')

export {}
