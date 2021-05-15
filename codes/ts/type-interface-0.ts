type Name = string
// const name: Name = 22
const name: Name = 'sss'

// Object
type PartialPointX = { x: number }
type PartialPointY = { y: number; z: number }
// union
type PartialPoint = PartialPointX | PartialPointY
const pointx: PartialPointX = { x: 1 }
const pointy: PartialPointY = { y: 1, z: 88 }
const pointer: PartialPoint = { x: 100, y: 200, z: 300 }

// tuple
type Data = [number, string]
const dataArr: Array<Data> = [[1, 'ss']]
const data: Data = [1, 'ss']
export {}
