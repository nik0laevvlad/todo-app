import { TodoItem } from '../types';
import { ListItem } from './ListItem';
import React from 'react';

interface List {
  list: TodoItem[];
  completeTask: (selectedTodo: TodoItem) => void;
}

export const TodoList = ({ list, completeTask }: List) => {
  return (
    <div className="mt-3 h2">
      {list.map((item: TodoItem, key: number) => {
        return <ListItem key={key} item={item} completeTask={completeTask} />;
      })}
    </div>
  );
};