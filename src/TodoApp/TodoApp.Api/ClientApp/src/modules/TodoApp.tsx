import React, { useEffect, useState } from 'react';
import { TodoItem } from '../types';
import { AddItemForm, TodoList } from './index';
import axios from 'axios';

export function TodoApp() {
  const [list, setList] = useState<TodoItem[]>([]);

  const addTodo = (item: string) => {
    const newItem = { text: item, completed: false };
    if (newItem.text.trim() !== '') {
      axios
        .post('api/todo', {
          text: newItem.text,
        })
        .then((response) => {
          console.log(response.data);
        });
    }
  };

  const completeTask = (selectedTodo: TodoItem) => {
    axios.put(`api/todo/${selectedTodo.id}/complete`).then((response) => {
      console.log(response.data);
    });
  };

  const deleteTask = (id: string) => {
    axios.delete(`api/todo/${id}`).then((response) => {
      console.log(response.data);
    });
  };

  const updateTask = (selectedTodo: TodoItem, text: string) => {
    if (text.trim() !== '') {
      selectedTodo.text = text;
      setList([...list]);
    }
  };

  useEffect(() => {
    axios.get('/api/todo').then((response) => {
      console.log(response);
      setList(response.data);
    });
  }, [setList]);

  return (
    <>
      <div className='container'>
        <h1>To Do App</h1>
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
