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
  const show = (key: number) => {
    console.log(key);
    setHidden(!hidden);
  };

  return (
    <div>
      <div className="mt-3 h2">
        {list.map((item: TodoItem, key: number) => {
          return (
            <>
              <ListItem
                key={key}
                item={item}
                completeTask={completeTask}
                deleteTask={() => deleteTask(key)}
                show={() => show(key)}
              />
              <Form
                hidden={hidden}
                onSubmit={(e) => {
                  e.preventDefault();
                  updateTask(item, newText);
                  setNewText('');
                }}
              >
                <Row className="mt-5">
                  <Col md="auto">
                    <FormControl
                      placeholder={item.text}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                    />
                  </Col>
                  <Col md="auto">
                    <Button
                      onClick={() => {
                        updateTask(item, newText);
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
        })}
      </div>
    </div>
  );
};
