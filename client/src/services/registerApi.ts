import axios from "axios";
const baseURL = "http://localhost:3000/auth";

const axiosInstance = axios.create({
  baseURL,
});

export const Register = async (data: any) => {
  try {
    const response = await axiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
