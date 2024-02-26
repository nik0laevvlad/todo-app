export interface TodoItemDto {
  id: string;
  text: string;
  completed: boolean;
  listId: string;
}

export interface TodoListDto {
  id: string;
  name: string;
}

export interface UserContextDto {
  id?: string;
  isAuthenticated: boolean;
}
