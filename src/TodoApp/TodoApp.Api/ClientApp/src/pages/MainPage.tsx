import App from '../App';
import { useEffect } from 'react';

export function MainPage() {
  useEffect(() => {
    document.title = 'Main page';
  }, []);

  return <App />;
}
