import { defineStore } from "pinia";
import router from "@/router";
import Cookies from "js-cookie";
import { Login } from "@/services/loginApi";
import { LoginData } from "@/types/UserData";
import { Token } from "@/types/Token";
export const useLogin = defineStore("login", {
  state: (): Token => ({
    token: Cookies.get("authToken") || "",
    username: Cookies.get("authUsername") || "",
    role: Cookies.get("authRole") || "",
  }),
  actions: {
    submitLogout() {
      Cookies.remove("authToken");
      Cookies.remove("authUsername");
      Cookies.remove("authRole");
      router.push('/login')
    },
    async submitLogin(loginData: LoginData) {
      try {
        const response = await Login(loginData);
        const token = response.data.token || "";
        const username = response.data.user.username || "";
        const role = response.data.user.roles[0] || "";
        Cookies.set("authToken", token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("authUsername", username, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("authRole", role, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        router.push("/");
      } catch (error: any) {
        console.log("auth error", error);
      }
    },
  },
});
