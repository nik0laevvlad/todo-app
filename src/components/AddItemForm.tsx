import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';
import React, { ChangeEvent } from 'react';

interface Props {
  item: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addTodo: () => void;
}

export const AddItemForm = ({ item, handleChange, addTodo }: Props) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo();
      }}
    >
      <Row className="mt-5 justify-content-md-center">
        <Col md="auto">
          <FormControl
            name="input"
            placeholder="To Do..."
            value={item}
            onChange={handleChange}
          />
        </Col>
        <Col md="auto">
          <Button onClick={addTodo}>Submit</Button>
        </Col>
      </Row>
    </Form>
  );
};
