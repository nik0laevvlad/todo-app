import React, { useEffect, useState } from 'react';
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

export default App;
