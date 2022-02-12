import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import { TodoItem } from "./interface";
import { ListItem } from "./components/ListItem";

function App() {
  const [item, setItem] = useState('');
  const [list, setList] = useState<TodoItem[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "input") {
      setItem(e.target.value);
    }
  };

  const addTodo = () => {
    const newItem = {text: item, completed: false}
    setList([...list, newItem]);
    setItem("");
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
        <Form className="mt-5">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <FormControl name="input" placeholder="ToDo" value={item} onChange={handleChange}/>
            </Col>
            <Col md="auto">
              <Button onClick={addTodo}>Submit</Button>
            </Col>
          </Row>
        </Form>
        <div className="mt-3 h2">
          {list.map((item: TodoItem, key: number) => {
            return <ListItem key={key} item={item} completeTask={completeTask}/>
          })}
        </div>
      </Container>
    </div>
  );
}

export default App;
