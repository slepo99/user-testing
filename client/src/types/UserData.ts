export interface LoginData {
  username: string;
  password: string;
}
export interface UpdatedData {
  score: string
}
export interface UserData extends LoginData {
  roles: string;
}
export interface RegistrationResponse {
  
  message: string;
  status: number
}
