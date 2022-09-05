import { useEffect, useState } from 'react';
import { TodoListDto } from '../../types';
import { Notify } from 'notiflix';
import { Button, Col, Row } from 'react-bootstrap';
import { AddListForm } from './Forms';
import { TaskListPanel } from './TaskListPanel';
import { http } from '../../components';

export const TodoLists = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<TodoListDto[]>([]);

  const getList = () => {
    http.get('/api/list').then((response) => {
      setData(response.data);
    });
  };

  const addList = (name: string) => {
    if (name.trim() !== '') {
      http
        .post('api/list', {
          name: name,
        })
        .then(() => {
          Notify.success('List was successfully added');
          getList();
          setVisible(false);
        });
    }
  };

  const deleteList = (id: string) => {
    http.delete(`api/list/${id}`).then(() => {
      Notify.success('List was successfully deleted');
      getList();
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <Row className="mb-4 text-center">
        <Col md={12}>
          <h1 className="mb-2" style={{ color: 'white' }}>
            TodoApp
          </h1>
          <Button variant="light" onClick={() => setVisible(true)}>
            Add list
          </Button>
          {visible && <AddListForm onSubmit={addList} />}
        </Col>
      </Row>
      {data.map((list) => {
        return (
          <Row className="mt-3">
            <Col>
              <TaskListPanel
                data={list}
                key={list.id}
                deleteList={deleteList}
              />
            </Col>
          </Row>
        );
      })}
    </div>
  );
};
