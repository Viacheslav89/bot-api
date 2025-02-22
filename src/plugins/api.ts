import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const api = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://87.249.49.97:78/api/v1/',
  })
);
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
