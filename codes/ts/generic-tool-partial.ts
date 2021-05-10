/**
 * node_modules/typescript/lib/lib.es5.d.ts
 * Make all properties in T optional
 */
// type Partial<T>{
//     [P in keyof T]?: T[P]
// }

interface Todo {
  title: string
  desc: string
}

function updateTodo(todo: Todo, filedsToUpdate: Partial<Todo>) {
  return { ...todo, ...filedsToUpdate }
}

const todo1 = {
  title: 'test title 1',
  desc: 'test desc 1',
}

const todo2 = updateTodo(todo1, { desc: 'updated desc' })
console.info('todo2', todo2)

// 在上面的 updateTodo 方法中, 我们利用 Partial<T>工具类型, 定义 filedsToUpdate 的类型为 Partial<Todo>也就是
interface TodoPartial {
  title?: string | undefined
  desc?: string | undefined
}

export {}
