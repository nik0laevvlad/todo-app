import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { TodoItem } from './types';
import { AddItemForm, TodoList } from './components';

function App() {
  const [list, setList] = useState<TodoItem[]>([]);

  const addTodo = (item: string) => {
    const newItem = { text: item, completed: false };
    if (newItem.text.trim() !== '') {
      setList([...list, newItem]);
      localStorage.setItem('todoList', JSON.stringify([...list, newItem]));
    }
  };

  const completeTask = (selectedTodo: TodoItem) => {
    selectedTodo.completed = !selectedTodo.completed;
    setList([...list]);
    localStorage.setItem('todoList', JSON.stringify([...list]));
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('todoList') || '[]');
    setList(storage);
  }, [])

  return (
    <>
      <Container>
        <AddItemForm addTodo={(item) => addTodo(item)} />
        <TodoList completeTask={completeTask} list={list} />
      </Container>
    </>
  );
}

export default App;
