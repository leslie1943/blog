interface Point {
  x: number
  y: number
}

class SomePoint implements Point {
  x = 0
  y = 0
}

type Point2 = {
  x: number
  y: number
}
class SomePoint2 implements Point2 {
  x = 0
  y = 0
}

type PartialPoint = { x: number } & { y: number }

// A class can only implement an object type or
// intersection of object types with statically known members.ts(2422)
// class SomePartialPoint implements PartialPoint {} // Error ❌

export {}
