import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';
import React, { useState } from 'react';

interface Props {
  updateTask: (text: string) => void;
  initialState: string;
}

export const UpdateTask = ({ updateTask, initialState }: Props) => {
  const [newText, setNewText] = useState(initialState);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        updateTask(newText);
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
