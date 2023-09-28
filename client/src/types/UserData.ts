export interface LoginData {
  username: string;
  password: string;
}

export interface UserData extends LoginData {
  roles: string;
}
export interface RegistrationResponse {
  message: string;
  status: number
}
