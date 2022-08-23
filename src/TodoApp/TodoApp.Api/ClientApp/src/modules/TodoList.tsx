import { TodoItemDto } from '../types';
import { ListItem } from './ListItem';
import React, { useState } from 'react';
import { UpdateTaskForm } from './Forms';

interface Props {
  list: TodoItemDto[];
  completeTask: (selectedTodo: TodoItemDto) => void;
  deleteTask: (id: string) => void;
  updateTask: (selectedTodo: TodoItemDto, text: string) => void;
}

export const TodoList = ({
  completeTask,
  list,
  deleteTask,
  updateTask,
}: Props) => {
  const [selectedId, setSelectedId] = useState<number>();

  const show = (key: number) => {
    if (key !== selectedId) {
      setSelectedId(key);
    } else {
      setSelectedId(undefined);
    }
  };

  return (
    <>
      <div className="mt-3 h2">
        {list.map((item: TodoItemDto, index: number) => {
          return (
            <div key={index}>
              <ListItem
                item={item}
                completeTask={completeTask}
                deleteTask={() => deleteTask(item.id)}
                show={() => show(index)}
              />
            </div>
          );
        })}
      </div>
      {selectedId !== undefined && (
        <UpdateTaskForm
          updateTask={(text: string) => updateTask(list[selectedId], text)}
          initialValue={list[selectedId].text}
          onUpdated={() => setSelectedId(undefined)}
        />
      )}
    </>
  );
};
