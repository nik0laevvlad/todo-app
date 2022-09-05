import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.sass';
import { BrowserRouter } from 'react-router-dom';
import { Pages } from './pages';
import { Layout } from './components';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Pages />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
