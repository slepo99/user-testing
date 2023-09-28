import axios, { AxiosResponse } from "axios";
import { LoginData } from "@/types/UserData";

const baseURL = "http://localhost:3000/auth";

const axiosInstance = axios.create({
  baseURL,
});

export const Login = async (loginData: LoginData): Promise<AxiosResponse<any>> => {
  const response = await axiosInstance.post("/login", loginData);
  return response;
};
