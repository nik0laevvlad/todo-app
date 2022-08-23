import { Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { AddListForm } from './modules/Forms';
import axios from 'axios';
import { TodoListDto } from './types';
import { TaskListPanel } from './modules';
import { Notify } from 'notiflix';

function App() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<TodoListDto[]>([]);

  const getList = () => {
    axios.get('/api/list').then((response) => {
      setData(response.data);
    });
  };

  const addList = (name: string) => {
    if (name.trim() !== '') {
      axios
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
    axios.delete(`api/list/${id}`).then(() => {
      Notify.success('List was successfully deleted');
      getList();
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Container>
      <Row className="mb-4 text-center">
        <Col md={12}>
          <h1 color="#ffffff" className="h1">
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
          <Row className="mt-5">
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
    </Container>
  );
}

export default App;
