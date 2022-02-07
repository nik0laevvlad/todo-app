import { AddTodo } from "../interface";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

export function AddToDo(props: AddTodo) {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.createItem(value);
    setValue('');
  };

  return(
    <div>
      <Form>
        <input type="text" value={value} onChange={onChange} />
        <Button type="submit" onSubmit={onSubmit}>Submit</Button>
      </Form>
    </div>
  )
}