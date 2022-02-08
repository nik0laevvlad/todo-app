import React from 'react';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="d-grid gap-2">
      <Button variant="primary" size="lg">
        Block level button
      </Button>
      <Button variant="success" size="lg">
        Block level button
      </Button>
    </div>
  );
}

export default App;
