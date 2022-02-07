export interface TodoItem {
  text: string,
  completed: boolean,
}

export interface AddTodo {
  createItem: (value: string) => void,
}