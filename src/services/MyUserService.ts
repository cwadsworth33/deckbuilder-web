import { SignUpReq, User, LoginReq } from "../models/SignUp";
import { AxiosResponse, AxiosInstance } from "axios";
import { BehaviorSubject, Observable, of } from "rxjs";

export class MyUserService {

  private myUser = new BehaviorSubject<User | null>(null);
  private isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('authorizationHeader'));

  constructor(private http: AxiosInstance) {
    const authHeader = localStorage.getItem('authorizationHeader');
    if (authHeader) {
      this.setAuthorizationHeader(authHeader);
    }
  }

  public getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public getMyUser(): Observable<User | null> {
    return this.myUser.asObservable();
  }

  public signUp(signUpReq: SignUpReq): Promise<AxiosResponse<User>> {
    return this.http.post('/users', signUpReq).then(res => {
      this.myUser.next(res.data);
      return res;
    });
  }

  public setAuthorizationHeader(authHeader: string): void {
    if (authHeader) {
      this.isLoggedIn.next(true);
      localStorage.setItem('authorizationHeader', authHeader);
    } else {
      this.isLoggedIn.next(false);
    }
    this.http.interceptors.request.use(config => {
      config.headers.post['authorization'] = authHeader;
      return config;
    });
  }

  public logout(): void {
    localStorage.clear();
    this.isLoggedIn.next(false);
  }

  public login(loginReq: LoginReq): Promise<AxiosResponse<null>> {
    return this.http.post('/login', loginReq).then(res => {
      if (res && res.headers && res.headers.authorization) {
        this.setAuthorizationHeader(res.headers.authorization);
      }
      return res;
    });
  }
}