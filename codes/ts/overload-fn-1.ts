type StringNumber = string | number

function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: string, b: number): string
function add(a: number, b: string): string
function add(x: StringNumber, y: StringNumber) {
  if (typeof x === 'string' || typeof y === 'string') {
    return x.toString() + y.toString()
  }
  return x + y
}

const result = add('leslie', ' su')
console.info('result.split(" ")', result.split(' ')) // result.split(" ") [ 'leslie', 'su' ]

export {}
