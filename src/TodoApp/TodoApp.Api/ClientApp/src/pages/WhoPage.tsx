import { useEffect, useState } from 'react';
import { http } from '../components';

interface WhoIAm {
  id: string;
  username: string;
  email: string;
}

export const WhoPage = () => {
  const [value, setValue] = useState<WhoIAm>();

  useEffect(() => {
    document.title = 'Test page';
  }, []);

  useEffect(() => {
    http.get('api/user/who').then((response) => setValue(response.data));
  }, []);

  return (
    <div className="custom-container">
      <h3>I Am</h3>
      <div>id: {value?.id}</div>
      <div>email: {value?.email}</div>
      <div>username: {value?.username}</div>
    </div>
  );
};
