import { Button, Form } from 'react-bootstrap';
import { Notify } from 'notiflix';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../components';

const useRegister = () => {
  const push = useNavigate();

  return useCallback(
    (username: string, email: string, password: string) => {
      http
        .post('api/user/register', {
          username: username,
          email: email,
          password: password,
        })
        .then(() => {
          push('/login');
          Notify.success('Account has been successfully created');
        })
        .catch((e) => {
          Notify.failure(e.toString());
        });
    },
    [push],
  );
};

export const RegistrationForm = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const register = useRegister();

  return (
    <div className="custom-container">
      <h3>Sign up</h3>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          register(username, email, password);
        }}
      >
        <Form.Group className="mt-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
