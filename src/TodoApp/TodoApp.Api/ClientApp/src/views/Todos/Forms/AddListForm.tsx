import { Button, Form, FormControl } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../components';

interface Props {
  onSubmit: (name: string, ownerId?: string) => void;
}

export const AddListForm = (props: Props) => {
  const { onSubmit } = props;
  const [name, setName] = useState('');
  const context = useContext(AuthContext);

  return (
    <>
      <Form
        className="input"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(name, context.id);
          setName('');
        }}
      >
        <FormControl
          className="input_value"
          placeholder="ex. List 1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="input_button_white" type="submit" />
      </Form>
    </>
  );
};
