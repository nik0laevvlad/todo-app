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
  const [hidden, setHidden] = useState(true);
  const [id, setId] = useState(0);

  const show = (key: number) => {
    setId(key);
    // setNewText(list[key].text);
    if (key === id) {
      setHidden(!hidden);
    } else {
      setHidden(false);
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
      <UpdateTask hidden={hidden} id={id} list={list} updateTask={updateTask} />
    </>
  );
};
