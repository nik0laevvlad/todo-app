import { Button, Form, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';

interface Props {
  onSubmit: (name: string) => any;
}

export const AddListForm = (props: Props) => {
  const { onSubmit } = props;
  const [name, setName] = useState('');

  return (
    <>
      <Form
        className="input"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(name);
          setName('');
        }}
      >
        <FormControl
          className="input_value"
          placeholder="ex. List 1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="input_button" type="submit" />
      </Form>
    </>
  );
};
