import axios, { AxiosInstance } from 'axios';
import { MyUserService } from './services/MyUserService';
import { ToastService } from './services/ui/ToastService';

type AppServices = {
  http: AxiosInstance,
  myUserService: MyUserService,
  toastService: ToastService
}

const http: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
const myUserService = new MyUserService(http);
const toastService = new ToastService();

export default {
  http,
  myUserService,
  toastService
} as AppServices;