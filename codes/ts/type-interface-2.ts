type PartialPointX = {
  x: number
}

interface Point extends PartialPointX {
  y: number
}

const point: Point = {
  x: 1,
  y: 2,
}

interface FirstName {
  first: string
}

type FullName = FirstName & { last: string }
const name: FullName = {
  first: 'su',
  last: 'zhen',
}

export {}
