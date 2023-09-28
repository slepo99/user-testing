import axios, { AxiosResponse }  from "axios";
import { UserData, RegistrationResponse } from "@/types/UserData";
const baseURL = "http://localhost:3000/auth";

const axiosInstance = axios.create({
  baseURL,
});

export const Register = async (userData: UserData): Promise<AxiosResponse<RegistrationResponse>> => {
  const response = await axiosInstance.post("/registration", userData);
  return response;
  
};
