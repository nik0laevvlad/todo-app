import { Form } from 'react-bootstrap';
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
      <input
        className='input_value'
        placeholder='To Do...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className='input_button' type='submit' />
    </Form>
  );
};
