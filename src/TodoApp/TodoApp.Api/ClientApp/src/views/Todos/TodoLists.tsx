import { useContext, useEffect, useState } from 'react';
import { TodoListDto } from '../../types';
import { Notify } from 'notiflix';
import { Button, Col, Row } from 'react-bootstrap';
import { AddListForm } from './Forms';
import { TaskListPanel } from './TaskListPanel';
import { AuthContext, http } from '../../components';

export const TodoLists = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<TodoListDto[]>([]);
  const context = useContext(AuthContext);

  const getList = () => {
    http.get(`/api/list?ownerId=${context.id}`).then((response) => {
      setData(response.data);
    });
  };

  const addList = (name: string) => {
    if (name.trim() !== '') {
      http
        .post('api/list', {
          name: name,
          ownerId: context.id,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Row className="mb-4 text-center">
        <Col md={12}>
          <h1 className="mb-2" style={{ color: 'white' }}>
            TodoApp
          </h1>
          {visible ? (
            <AddListForm onSubmit={addList} />
          ) : (
            <Button variant="light" onClick={() => setVisible(true)}>
              Add list
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        {data.map((list, key) => {
          return (
            <Col key={key}>
              <TaskListPanel
                data={list}
                key={list.id}
                deleteList={deleteList}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
