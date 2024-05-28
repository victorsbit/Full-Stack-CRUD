import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

api.interceptors.request.use(
  function (config) {
    const token = Cookies.get('token');

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;
