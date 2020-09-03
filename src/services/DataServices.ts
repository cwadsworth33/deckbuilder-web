import axios, { AxiosInstance } from 'axios';
import { MyUserService } from './MyUserService';

export const http: AxiosInstance = axios.create({
    baseURL: '',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export const myUserService = new MyUserService(http);