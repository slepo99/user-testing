import { defineStore } from "pinia";
import router from "@/router";
import { Login } from "@/services/loginApi";
import { LoginData } from "@/types/UserData";
import { Token } from "@/types/Token";
export const useLogin = defineStore("login", {
  state: (): Token => ({
    token: localStorage.getItem("authToken") || "",
    username: localStorage.getItem("authUsername") || "",
    role: localStorage.getItem("authRole") || "",
    _id: localStorage.getItem("authId") || "",
    score: localStorage.getItem("authScore") || "",
  }),
  actions: {
    async submitLogout() {
      try {
        await Promise.all([
          localStorage.removeItem("authToken"),
          localStorage.removeItem("authUsername"),
          localStorage.removeItem("authRole"),
          localStorage.removeItem("authId"),
          localStorage.removeItem("authScore"),
        ]);
        
        this.token = "";
        this.username = "";
        this.role = "";
        this._id = "";
        this.score = "";
        router.push("/login");
      } catch (error) {
        console.log("logout error", error);
      }
    },
    async submitLogin(loginData: LoginData) {
      try {
        const response = await Login(loginData);

        const token = response.data.token || "";
        const username = response.data.user.username || "";
        const role = response.data.user.roles[0] || "";
        const _id = response.data.user._id || "";
        const score = response.data.user.score || "";
        await Promise.all([
          localStorage.setItem("authToken", token),
          localStorage.setItem("authUsername", username),
          localStorage.setItem("authRole", role),
          localStorage.setItem("authId", _id),
          localStorage.setItem("authScore", score),
        ]);
        this.token = token;
        this.username = username;
        this.role = role;
        this._id = _id;
        this.score = score;
        router.push("/");
      } catch (error: any) {
        console.log("auth error", error);
      }
    },
  },
});
