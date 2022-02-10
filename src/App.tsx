import React, { useEffect, useState } from 'react';
import { AddToDo } from "./components/AddToDo";
import { TodoItem } from "./interface";
import { Container } from "react-bootstrap";

function App() {
  const [todos, setTodos] = useState<Array<TodoItem>>([])

  const addTodo = (props: string) => {
    setTodos([...todos, {text: props, completed: false}]);
  };

  return (
    <div>
      <Container>
        <AddToDo createItem={addTodo} />
      </Container>
    </div>
  );
}

export default App;
