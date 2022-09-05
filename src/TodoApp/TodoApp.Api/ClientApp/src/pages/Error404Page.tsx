import { useEffect } from 'react';

export function Error404Page() {
  useEffect(() => {
    document.title = '404';
  }, []);

  return (
    <div className="text-center">
      <h2 style={{ color: 'white' }}>Oh no! This page can't be found.</h2>
      <p style={{ color: 'white' }}>
        We're sorry but this page is either missing or the web address isn't
        quite right.
      </p>
    </div>
  );
}
