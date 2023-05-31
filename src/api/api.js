import axios from 'axios';

export const api = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      'accessToken'
    )} ${localStorage.getItem('refreshToken')}`,
  },
});

const DevUrl = 'http://localhost:3001/api';
const ProductionUrl = 'https://cookie-test-server-1903.herokuapp.com/api';

export const baseUrl = DevUrl;
