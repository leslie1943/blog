// 定义
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * From T, pick a set of properties whose keys are in the union K
 */
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }

interface Todo {
  title: string
  desc: string
  finished: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'finished'>

interface TodoShow extends Pick<Todo, 'title' | 'finished'> {}

const todo1: TodoPreview = {
  title: 'Clean room',
  finished: true,
}

const todo2: TodoShow = {
  title: 'Coding',
  finished: true,
}
