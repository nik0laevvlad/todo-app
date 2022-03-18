import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import { TodoItem } from '../types';

interface Props {
  hidden: boolean;
  updateTask: (selectedTodo: TodoItem, text: string) => void;
  list: TodoItem[];
  id: number;
}

export const UpdateTask = ({ hidden, updateTask, list, id }: Props) => {
  const [newText, setNewText] = useState('');

  return (
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
          <Button type="submit">Update</Button>
        </Col>
      </Row>
    </Form>
  );
};
