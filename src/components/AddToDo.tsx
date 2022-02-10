import { AddTodo } from "../interface";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Form, FormControl, Row } from "react-bootstrap";

export const AddToDo: React.FC<AddTodo> = ({ createItem }) => {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createItem(value);
    setValue('');
  };

  return(
    <div>
      <Form className="mt-5">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <FormControl placeholder="ToDo" value={value} onChange={onChange} />
          </Col>
          <Col md="auto">
            <Button type="submit" onSubmit={onSubmit}>Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}