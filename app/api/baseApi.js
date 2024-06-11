import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://api.pexels.com/v1',  // Corrected key name
  responseType: 'json',
  timeout: 10000,  // Optional, adjust based on your needs
});

export default baseApi;
