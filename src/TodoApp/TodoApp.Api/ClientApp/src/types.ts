export interface TodoItemDto {
  id: string;
  text: string;
  completed: boolean;
  parentId: string;
}

export interface TodoListDto {
  id: string;
  name: string;
}
