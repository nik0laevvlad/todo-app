import { TodoItem } from '../types';
import { ListItem } from './ListItem';
import React, { useState } from 'react';
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';

interface Props {
  list: TodoItem[];
  completeTask: (selectedTodo: TodoItem) => void;
  deleteTask: (index: number) => void;
  updateTask: (selectedTodo: TodoItem, text: string) => void;
}

export const TodoList = ({
  completeTask,
  list,
  deleteTask,
  updateTask,
}: Props) => {
  const [newText, setNewText] = useState('');
  const [hidden, setHidden] = useState(true);
  const [id, setId] = useState(0);
  
  const show = (key: number) => {
    setId(key);
    setNewText(list[key].text);
    if (key === id) {
      setHidden(!hidden);
    } else {
      setHidden(false);
    }
  };

  return (
    <>
      <div className="mt-3 h2">
        {list.map((item: TodoItem, key: number) => {
          return (
            <div key={key}>
              <ListItem
                item={item}
                completeTask={completeTask}
                deleteTask={() => deleteTask(key)}
                show={() => show(key)}
              />
            </div>
          );
        })}
      </div>
      <Form
        hidden={hidden}
        onSubmit={(e) => {
          e.preventDefault();
          updateTask(list[id], newText);
          setNewText('');
        }}
      >
        <Row className="mt-5">
          <Col md="auto">
            <FormControl
              placeholder="update"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </Col>
          <Col md="auto">
            <Button
              onClick={() => {
                updateTask(list[id], newText);
                setNewText('');
              }}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
