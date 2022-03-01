import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { TodoItem } from './types';
import { AddItemForm, TodoList } from './components';

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

  const completeInLocalStorage = () => {
    const storage = JSON.parse(localStorage.getItem('todoList') || '[]');
    list.map((item: TodoItem, key: number) => {
      return storage.push((item.completed = !item.completed));
    });
    localStorage.setItem('todoList', JSON.stringify(storage));
  };

  const GetList = () => {
    const localList = JSON.parse(localStorage.getItem('todoList') || '[]');

    return (
      <>
        <Button>Load From LS</Button>
        <TodoList list={localList} completeTask={completeInLocalStorage} />
      </>
    );
  };

  const pushItem = () => {
    const storage = JSON.parse(localStorage.getItem('todoList') || '[]');
    list.map((item: TodoItem, key: number) => {
      return storage.push(item);
    });
    localStorage.setItem('todoList', JSON.stringify(storage));
  };

  return (
    <div>
      <Container>
        <AddItemForm addTodo={(item) => addTodo(item)} />
        <TodoList completeTask={completeTask} list={list} />
        <Button onClick={pushItem}>Save to LS</Button>
        <GetList />
      </Container>
    </div>
  );
}

export default App;
