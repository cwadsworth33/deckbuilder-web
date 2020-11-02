import axios, { AxiosInstance } from 'axios';
import { DeckService } from './services/DeckService';
import { MyUserService } from './services/MyUserService';
import { ToastService } from './services/ui/ToastService';

type AppServices = {
  http: AxiosInstance,
  myUserService: MyUserService,
  toastService: ToastService,
  deckService: DeckService
}

const http: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000
});
const login: AxiosInstance = axios.create({
  baseURL: '/',
  timeout: 1000
});
const myUserService = new MyUserService(http, login);
const toastService = new ToastService();
const deckService = new DeckService(http);

export default {
  http,
  myUserService,
  toastService,
  deckService
} as AppServices;