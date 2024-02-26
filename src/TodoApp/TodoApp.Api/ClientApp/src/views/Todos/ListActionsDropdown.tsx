import { Dropdown } from 'react-bootstrap';
import React from 'react';

interface Props {
  deleteList: () => void;
}

export const ListActionsDropdown = (props: Props) => {
  const { deleteList } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-basic"
        className="delete-dropdown"
        variant="secondary"
      >
        Action
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={deleteList}>Delete list</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
