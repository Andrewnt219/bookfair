import Axios from 'axios';
import { getErrorMessage } from '../../utils';

export const axios = Axios.create({
  baseURL: '/',
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = getErrorMessage(error);
    console.error({ error: message });
    return Promise.reject(error);
  }
);
