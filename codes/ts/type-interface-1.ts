interface PartialPointX {
  x: number
}

interface Point extends PartialPointX {
  y: number
}

const point: Point = { x: 11, y: 22 }

type FirstName = { first: string }
type FullName = FirstName & { last: string }

const fullName: FullName = { first: 'su', last: 'zhen' }

export {}
