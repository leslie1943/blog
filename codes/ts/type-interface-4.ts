interface Point {
  x: number
}

interface Point {
  y: number
}

interface Point {
  y: number
}

interface Point {
  z: number
}

const point: Point = {
  x: 1,
  y: 2,
  z: 3,
}

type FirstName = {
  first: string
}

type Name = {
  last: string
} & FirstName

const name: Name = {
  first: 'su',
  last: 'zhen',
}

export {}
