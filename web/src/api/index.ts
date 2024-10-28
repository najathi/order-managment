import { __APP_API_URL__ } from '@/lib/constants';
import axios, { type AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: __APP_API_URL__,
  headers: { "Content-Type": "application/json" }
});

export default instance;