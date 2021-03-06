import { SignUpReq, User, LoginReq } from "../models/SignUp";
import { AxiosResponse, AxiosInstance } from "axios";
import { BehaviorSubject, Observable } from "rxjs";

export class MyUserService {

  private myUserId = new BehaviorSubject<string | null>(localStorage.getItem('userId'));
  private isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('authorizationHeader'));

  constructor(private http: AxiosInstance, private loginApi: AxiosInstance) {
    const authHeader = localStorage.getItem('authorizationHeader');
    if (authHeader) {
      this.setAuthorizationHeader(authHeader);
    }
  }

  public getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public getMyUserId(): Observable<string | null> {
    return this.myUserId.asObservable();
  }

  public signUp(signUpReq: SignUpReq): Promise<AxiosResponse<User>> {
    return this.http.post('/users', signUpReq);
  }

  public setAuthorizationHeader(authHeader: string): void {
    if (authHeader) {
      this.isLoggedIn.next(true);
      localStorage.setItem('authorizationHeader', authHeader);
      this.http.interceptors.request.use(req => {
        req.headers.authorization = authHeader;
        return req;
      });
    } else {
      this.isLoggedIn.next(false);
    }
  }

  public logout(): void {
    localStorage.removeItem('authorizationHeader');
    localStorage.removeItem('userId');
    this.isLoggedIn.next(false);
    window.location.reload();
  }

  public login(loginReq: LoginReq): Promise<AxiosResponse<null>> {
    return this.loginApi.post('/login', loginReq).then(res => {
      if (res && res.headers && res.headers.authorization) {
        this.setAuthorizationHeader(res.headers.authorization);
      }
      if (res && res.headers && res.headers.userid) {
        this.myUserId.next(res.headers.userid);
        localStorage.setItem('userId', res.headers.userid);
      }
      return new Promise(function(resolve) { setTimeout(resolve, 100) });
    });
  }
}