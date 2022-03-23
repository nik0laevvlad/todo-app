import { TodoItem } from '../types';
import { ListItem } from './ListItem';
import React, { useState } from 'react';
import { UpdateTask } from './UpdateTask';

interface Props {
  list: TodoItem[];
  completeTask: (selectedTodo: TodoItem) => void;
  deleteTask: (index: number) => void;
  updateTask: (selectedTodo: TodoItem, text: string) => void;
}

export const TodoList = ({
  completeTask,
  list,
  deleteTask,
  updateTask,
}: Props) => {
  const [id, setId] = useState<number>();

  const show = (key: number) => {
    if (key !== id) {
      setId(key);
    }
    if (key === id) {
      setId(undefined);
    }
  };

  return (
    <>
      <div className="mt-3 h2">
        {list.map((item: TodoItem, index: number) => {
          return (
            <div key={index}>
              <ListItem
                item={item}
                completeTask={completeTask}
                deleteTask={() => deleteTask(index)}
                show={() => show(index)}
              />
            </div>
          );
        })}
      </div>
      {id !== undefined && (
        <UpdateTask
          updateTask={() => updateTask}
          initialState={list[id].text}
        />
      )}
    </>
  );
};
