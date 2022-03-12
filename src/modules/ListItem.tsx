import { TodoItem } from '../types';
import { Button, Col, FormCheck, Row } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';

interface Props {
  item: TodoItem;
  completeTask: (selectedTodo: TodoItem) => void;
  deleteTask: (index: number) => void;
  show: () => void;
}

export const ListItem = (
  { item, completeTask, deleteTask, show }: Props,
  key: number,
) => {
  return (
    <>
      <Row>
        <Col>
          <FormCheck>
            <FormCheckInput
              checked={item.completed}
              onChange={() => completeTask(item)}
            />
            <FormCheckLabel>
              <div
                style={{
                  textDecoration: item.completed ? 'line-through' : 'none',
                }}
              >
                {item.text}
              </div>
            </FormCheckLabel>
          </FormCheck>
        </Col>
        <Col>
          <Button onClick={() => show()} variant="success">
            Edit
          </Button>
        </Col>
        <Col>
          <Button onClick={() => deleteTask(key)} variant="danger">
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );
};
