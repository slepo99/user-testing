import axios from "axios";
import Test from "@/types/Tests";
const baseURL = "http://localhost:3000/api";
type GetTestsResponse = Test[]
const axiosInstance = axios.create({
  baseURL,
});

export const getTests = async () => {
  try {
    const response = await axiosInstance.get('/submit-test');
    return response.data as GetTestsResponse;
  } catch (error) {
    console.error("data retrieval error", error);
    throw error;
  }
};
