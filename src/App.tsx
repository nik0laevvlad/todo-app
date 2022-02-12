import React, { ChangeEvent, useState } from 'react';
import { Container } from "react-bootstrap";
import { TodoItem } from "./interface";
import { TodoList, AddItemForm } from "./components";

function App() {
  const [item, setItem] = useState('');
  const [list, setList] = useState<TodoItem[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "input") {
      setItem(e.target.value);
    }
  };

  const addTodo = () => {
    const newItem = {text: item, completed: false};
    if (newItem.text !== "") {
      setList([...list, newItem]);
      setItem("");
    }
  };

  const completeTask = (selectedTodo: TodoItem) => {
    const newItems = list.map((todo) => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    })
    setList(newItems);
  };

  return (
    <div>
      <Container>
        <AddItemForm item={item} handleChange={handleChange} addTodo={addTodo}/>
        <TodoList list={list} completeTask={completeTask}/>
      </Container>
    </div>
  );
}

export default App;
