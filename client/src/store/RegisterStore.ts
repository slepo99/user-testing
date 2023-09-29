import { defineStore } from "pinia";
import router from "@/router";
import Cookies from "js-cookie";
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

        await new Promise<void>((resolve) => {
          Cookies.set("authScore", score, {
            expires: 1,
            secure: true,
            sameSite: "strict",
          });
          resolve();
        });
      } catch (error) {
        console.log("resaveScore error", error);
      }
    },
  },
});
