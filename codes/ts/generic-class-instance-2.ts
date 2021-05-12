// interface Point {
//   new (x: number, y: number): Point
//   x: number
//   y: number
// }

// class Point2D implements Point {
//   readonly x: number
//   readonly y: number

//   constructor(x: number, y: number) {
//     this.x = x
//     this.y = y
//   }
// }

// const point: Point = new Point2D(1, 2)

interface Point {
  x: number
  y: number
}

interface PointConstructor {
  new (x: number, y: number): Point
}

class Point2D implements Point {
  readonly x: number
  readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

function newPoint(
  pointConstructor: PointConstructor,
  x: number,
  y: number
): Point {
  return new pointConstructor(x, y)
}

const point: Point = newPoint(Point2D, 1, 2)

export {}
