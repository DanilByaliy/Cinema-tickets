import axios from 'axios';
import serverURL from './constants';

const instance = axios.create({
  baseURL: serverURL,
});

export default instance;
