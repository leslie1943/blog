interface Todo {
  title: string
}

interface TodoPreview extends Todo {
  finished: boolean
}

type TodoShow = TodoPreview

const todo: TodoShow = {
  title: 's',
  finished: true,
}

export {}
