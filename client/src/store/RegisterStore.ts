import { defineStore } from "pinia";
import router from "@/router";
import { Register, UpdateUser, UpdateScore } from "@/services/registerApi";
import { RegistrationResponse, UserData, UpdatedData } from "@/types/UserData";
export const useRegister = defineStore("register", {
  state: (): RegistrationResponse => ({
    status: 0,
    message: "",
  }),
  actions: {
    async submitRegistration(userData: UserData) {
      try {
        const response = await Register(userData);
        console.log(response.data.message);
        this.message = response.data.message;
        this.status = response.status;
        router.push("/login");
      } catch (error: any) {
        console.error("registration error", error);
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data.message;
        } else {
          throw error;
        }
      }
    },
    async updateProfile(updatedData: UpdatedData) {
      const response = await UpdateUser(updatedData);
      console.log(response);
    },
    async resaveScore() {
      try {
        const response = await UpdateScore();
        const score = response.data.score || "";

        localStorage.setItem("authScore", score);
      } catch (error) {
        console.log("resaveScore error", error);
      }
    },
  },
});
