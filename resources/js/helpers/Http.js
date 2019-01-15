/* eslint-disable no-console */
import axios from 'axios'
import { GlobalConstants } from '../constants'
import { history } from '../helpers'


const API_URL = (process.env.NODE_ENV === 'test') ? process.env.BASE_URL || (`http://localhost:${process.env.PORT}/api/`) : `/api/`;

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.data.status_code === 401) {
      // we already know from the server that user is no longer logged in
      // just delete the local field
      localStorage.removeItem(GlobalConstants.USER_KEY);
      history.push('/');
    }
    return Promise.reject(error);
  });

export default axios
