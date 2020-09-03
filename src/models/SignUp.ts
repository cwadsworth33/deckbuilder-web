export interface SignUpReq {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface LoginReq {
  email: string;
  password: string;
}