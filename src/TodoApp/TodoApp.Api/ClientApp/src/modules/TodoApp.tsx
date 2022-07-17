import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { TodoItem } from '../types';
import { AddItemForm, TodoList } from './index';
import axios from 'axios';

export function TodoApp() {
  const [list, setList] = useState<TodoItem[]>([]);
  const [data, setData] = useState<TodoItem>();

  const addTodo = (item: string) => {
    const newItem = { text: item, completed: false };
    if (newItem.text.trim() !== '') {
      setList([...list, newItem]);
    }
  };

  const completeTask = (selectedTodo: TodoItem) => {
    selectedTodo.completed = !selectedTodo.completed;
    setList([...list]);
  };

  const deleteTask = (index: number) => {
    list.splice(index, 1);
    setList([...list]);
  };

  const updateTask = (selectedTodo: TodoItem, text: string) => {
    if (text.trim() !== '') {
      selectedTodo.text = text;
      setList([...list]);
    }
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('todoList') || '[]');
    setList(storage);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    axios.get('/api/todo/main')
      .then((response) => {
        console.log(response);
        setData(response.data);
      });
  }, [setData]);

  return (
    <>
      <Container>
        {data?.text}
        <AddItemForm addTodo={(item) => addTodo(item)} />
        <TodoList
          completeTask={completeTask}
          list={list}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </Container>
    </>
  );
}