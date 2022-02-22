import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { TodoItem } from './types';
import { AddItemForm, TodoList } from './components';

function App() {
  const [list, setList] = useState<TodoItem[]>([]);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const addTodo = (item: string) => {
    const newItem = { text: item, completed: false };
    if (newItem.text !== '') {
      setList([...list, newItem]);
    }
  };

  const completeTask = (selectedTodo: TodoItem) => {
    selectedTodo.completed = !selectedTodo.completed;
    setList([...list]);
  };

  return (
    <div>
      <Container>
        <AddItemForm addTodo={(item) => addTodo(item)} />
        <TodoList completeTask={completeTask} list={list} />
      </Container>
    </div>
  );
}

export default App;
