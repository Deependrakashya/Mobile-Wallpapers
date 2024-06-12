import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://api.pexels.com/v1', 
  responseType: 'json',
  timeout: 10000,  
});

export default baseApi;
