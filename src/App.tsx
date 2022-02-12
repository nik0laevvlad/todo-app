import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import { TodoItem } from "./interface";
import { ListItem } from "./components/ListItem";

function App() {
  const [item, setItem] = useState('');
  const [list, setList] = useState<TodoItem[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "input"){
      setItem(e.target.value);
    }
  };

  const addTodo = () => {
    const newItem = { text: item, completed: false }
    setList([...list, newItem]);
    setItem("");
  }

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
          <div className="mt-3 h2 text-center">
            {list.map((item: TodoItem, key: number) => {
              return <ListItem key={key} item={item} />
            })}
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default App;
