import { FC, useEffect, useState } from 'react';
import { NavPanel } from './NavPanel';
import { http } from './http';
import { Spinner } from 'react-bootstrap';
import { UserContextDto } from '../types';
import { AuthContext } from './AuthContext';

export const Layout: FC = ({ children }) => {
  const [context, setContext] = useState<UserContextDto>();

  useEffect(() => {
    http.get('api/user/context').then((response) => setContext(response.data));
  }, []);

  if (context == null) {
    return <Spinner animation="border" variant="info" />;
  }

  return (
    <AuthContext.Provider value={context}>
      <section>
        <header>{context && <NavPanel context={context} />}</header>

        <main className="custom-body">{children}</main>

        <footer></footer>
      </section>
    </AuthContext.Provider>
  );
};
