import { Container, Nav, Navbar } from 'react-bootstrap';
import { UserContextDto } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  context: UserContextDto;
}

export const NavPanel = (props: Props) => {
  const { context } = props;
  const push = useNavigate();

  const useLogout = () => {
    localStorage.removeItem('token');
    push(0);
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/todo-app">TodoApp</Navbar.Brand>

        {context.isAuthenticated && (
          <Nav className="me-auto">
            <Nav.Link href="/who">I Am</Nav.Link>
          </Nav>
        )}

        {context.isAuthenticated ? (
          <Nav>
            <Nav.Link onClick={useLogout}>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
