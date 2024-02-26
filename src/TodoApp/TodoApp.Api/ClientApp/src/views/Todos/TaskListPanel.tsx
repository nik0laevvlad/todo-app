import React, { useCallback, useEffect, useState } from 'react';
import { TodoItemDto, TodoListDto } from '../../types';
import { Notify } from 'notiflix';
import { AddItemForm } from './Forms';
import { TodoList } from './TodoList';
import { http } from '../../components';
import { ListActionsDropdown } from './ListActionsDropdown';

interface Props {
  data: TodoListDto;
  deleteList: (id: string) => void;
}

export function TaskListPanel(props: Props) {
  const { data, deleteList } = props;
  const [list, setList] = useState<TodoItemDto[]>([]);

  const addTodo = (item: string) => {
    const newItem = { text: item, completed: false };
    if (newItem.text.trim() !== '') {
      http
        .post(`api/list/${data.id}/item`, {
          text: newItem.text,
          listId: data.id,
        })
        .then(() => {
          Notify.success('Item was successfully added');
          getList();
        });
    }
  };

  const completeTask = (selectedTodo: TodoItemDto) => {
    http
      .put(`api/list/${data.id}/item/${selectedTodo.id}/complete`)
      .then((response) => {
        console.log(response.data);
        getList();
      });
  };

  const deleteTask = useCallback(
    (id: string) => {
      http.delete(`api/list/${data.id}/item/${id}`).then(() => {
        Notify.success('Item was successfully deleted');
        getList();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.id],
  );

  const updateTask = (selectedTodo: TodoItemDto, text: string) => {
    if (text.trim() !== '') {
      http
        .put(`api/list/${data.id}/item/${selectedTodo.id}`, {
          id: selectedTodo.id,
          text: text,
          listId: data.id,
        })
        .then(() => {
          Notify.success('Item was successfully updated');
          getList();
        });
    }
  };

  const getList = () => {
    http.get(`/api/list/${data.id}/item`).then((response) => {
      setList(response.data);
    });
  };

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="custom-container">
        <h3>{data.name}</h3>
        <ListActionsDropdown deleteList={() => deleteList(data.id)} />
        <AddItemForm addTodo={(item) => addTodo(item)} />
        <TodoList
          completeTask={completeTask}
          list={list}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>
    </>
  );
}
