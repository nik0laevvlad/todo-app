import { Button, Form } from 'react-bootstrap';
import { useCallback, useState } from 'react';
import { Notify } from 'notiflix';
import { useNavigate } from 'react-router-dom';
import { http } from '../../components';

const useLogin = () => {
  const push = useNavigate();

  return useCallback(
    (email: string, password: string) => {
      http
        .post('api/user/login', {
          email: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem('token', response.data);
          push('/');
          Notify.success('Authorized');
          push(0);
        });
    },
    [push],
  );
};

export const LoginForm = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const login = useLogin();

  return (
    <div className="custom-container">
      <h3>Sign in</h3>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          login(email, password);
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
