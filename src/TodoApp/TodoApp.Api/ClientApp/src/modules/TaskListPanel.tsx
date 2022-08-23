import React, { useCallback, useEffect, useState } from 'react';
import { TodoItemDto, TodoListDto } from '../types';
import { TodoList } from './index';
import axios from 'axios';
import { Notify } from 'notiflix';
import { AddItemForm } from './Forms';
import { Dropdown } from 'react-bootstrap';

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
      axios
        .post(`api/list/${data.id}/item`, {
          text: newItem.text,
          parentId: data.id,
        })
        .then(() => {
          Notify.success('Item was successfully added');
          getList();
        });
    }
  };

  const completeTask = (selectedTodo: TodoItemDto) => {
    axios
      .put(`api/list/${data.id}/item/${selectedTodo.id}/complete`)
      .then((response) => {
        console.log(response.data);
        getList();
      });
  };

  const deleteTask = useCallback(
    (id: string) => {
      axios.delete(`api/list/${data.id}/item/${id}`).then(() => {
        Notify.success('Item was successfully deleted');
        getList();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.id],
  );

  const updateTask = (selectedTodo: TodoItemDto, text: string) => {
    if (text.trim() !== '') {
      axios
        .put(`api/list/${data.id}/item/${selectedTodo.id}`, {
          id: selectedTodo.id,
          text: text,
          parentId: data.id,
        })
        .then(() => {
          Notify.success('Item was successfully updated');
          getList();
        });
    }
  };

  const getList = () => {
    axios.get(`/api/list/${data.id}/item`).then((response) => {
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
        <h2>{data.name}</h2>
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            className="delete-dropdown"
            variant="secondary"
          >
            Action
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => deleteList(data.id)}>
              Delete list
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
