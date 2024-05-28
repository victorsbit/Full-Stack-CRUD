import { history } from '@/main';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

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

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401 && Cookies.get('token')) {
      toast.warning(`${error.response.data.message}. Por favor, faça o login novamente`);
      history.push('/');
    }

    return Promise.reject(error);
  },
);

export default api;
