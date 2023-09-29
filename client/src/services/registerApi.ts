import axios, { AxiosResponse }  from "axios";
import { UserData, RegistrationResponse, UpdatedData } from "@/types/UserData";
const baseURL = "http://localhost:3000/auth";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL,
});

export const Register = async (userData: UserData): Promise<AxiosResponse<RegistrationResponse>> => {
  const response = await axiosInstance.post("/registration", userData);
  return response;
};
export const UpdateUser = async (updatedData: UpdatedData): Promise<AxiosResponse<RegistrationResponse>> => {
  const response = await axiosInstance.put(`/users/${Cookies.get("authId")}`, updatedData )
  return response
}
export const UpdateScore = async () => {
  const response = await axiosInstance.get(`/users/${Cookies.get("authId")}`)
  return response
}
