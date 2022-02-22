import { TodoItem } from '../types';
import { ListItem } from './ListItem';
import React, { useEffect, useState } from 'react';

interface Props {
  list: TodoItem[];
  completeTask: (selectedTodo: TodoItem) => void;
}

export const TodoList = ({ completeTask, list }: Props) => {
  const [store, setStore] = useState<TodoItem[]>();
  useEffect(() => {
    setStore(JSON.parse(localStorage.getItem('list') || '[]'));
  }, [list]);

  if (store === undefined) {
    return <></>;
  }
  return (
    <div>
      <div className="mt-3 h2">
        {store.map((item: TodoItem, key: number) => {
          return <ListItem key={key} item={item} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};
