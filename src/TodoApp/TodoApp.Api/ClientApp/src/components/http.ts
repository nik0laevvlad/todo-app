import axios from 'axios';
import { Notify } from 'notiflix';

export const http = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    Notify.failure(error.toString());
    if (error.response.status >= 400 && error.response.status < 500) {
      localStorage.removeItem('token');
    }
  },
);
