import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';
import React, { useState } from 'react';

interface Props {
  addTodo: (item: string) => void;
}

export const AddItemForm = ({ addTodo }: Props) => {
  const [text, setText] = useState('');

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(text);
        setText('');
      }}
    >
      <Row className="mt-5">
        <Col md="auto">
          <FormControl
            placeholder="To Do..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  );
};
