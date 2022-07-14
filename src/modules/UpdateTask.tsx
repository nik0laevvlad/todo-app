import { Button, Form, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';

interface Props {
  updateTask: (text: string) => void;
  initialValue: string;
}

export const UpdateTask = ({ updateTask, initialValue }: Props) => {
  const [newText, setNewText] = useState(initialValue);

  return (
    <Form
      className='input'
      onSubmit={(e) => {
        e.preventDefault();
        updateTask(newText);
        setNewText('');
      }}
    >
      <FormControl
        className='input_value'
        value={newText}
        onChange={(e) => {
          setNewText(e.target.value);
        }}
      />
      <Button className='input_update' type='submit' />
    </Form>
  );
};
