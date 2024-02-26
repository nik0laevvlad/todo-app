import { Button, Form, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';

interface Props {
  addTodo: (item: string) => void;
}

export const AddItemForm = ({ addTodo }: Props) => {
  const [text, setText] = useState('');

  return (
    <Form
      className='input'
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(text);
        setText('');
      }}
    >
      <FormControl
        className='input_value'
        placeholder='To Do...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button className='input_button' type='submit' />
    </Form>
  );
};
