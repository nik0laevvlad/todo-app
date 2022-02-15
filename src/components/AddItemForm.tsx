import { Button, Col, FormControl, Row } from 'react-bootstrap';
import React, { ChangeEvent } from 'react';

interface AddItem {
  item: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addTodo: () => void;
}

export const AddItemForm = ({ item, handleChange, addTodo }: AddItem) => {
  const pressEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <Row className="mt-5 justify-content-md-center">
      <Col md="auto">
        <FormControl
          onKeyPress={pressEnter}
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
  );
};
