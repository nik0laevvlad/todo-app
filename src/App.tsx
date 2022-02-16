import React, { ChangeEvent, useState } from 'react';
import { Container } from 'react-bootstrap';
import { TodoItem } from './types';
import { AddItemForm, TodoList } from './components';

function App() {
  const [item, setItem] = useState('');
  const [list, setList] = useState<TodoItem[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'input') {
      setItem(e.target.value);
    }
  };

  const addTodo = () => {
    const newItem = { text: item, completed: false };
    if (newItem.text !== '') {
      setList([...list, newItem]);
      setItem('');
    }
  };

  const completeTask = (selectedTodo: TodoItem) => {
    selectedTodo.completed = !selectedTodo.completed;
    setList([...list]);
  };

  return (
    <div>
      <Container>
        <AddItemForm
          item={item}
          handleChange={handleChange}
          addTodo={addTodo}
        />
        <TodoList list={list} completeTask={completeTask} />
      </Container>
    </div>
  );
}

export default App;
