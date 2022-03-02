import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { TodoItem } from './types';
import { AddItemForm, TodoList } from './modules';

function App() {
  const [list, setList] = useState<TodoItem[]>([]);

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
    const items = JSON.parse(localStorage.getItem('todoList') || '[]');
    items.splice(index, 1);
    setList(items);
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('todoList') || '[]');
    setList(storage);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]);

  return (
    <>
      <Container>
        <AddItemForm addTodo={(item) => addTodo(item)} />
        <TodoList
          completeTask={completeTask}
          list={list}
          deleteTask={deleteTask}
        />
      </Container>
    </>
  );
}

export default App;
