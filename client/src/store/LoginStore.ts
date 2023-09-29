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
    _id: Cookies.get("authId") || "",
    score: Cookies.get("authScore") || "",
  }),
  actions: {
    async submitLogout() {
      try {
        await Promise.all([
          new Promise<void>((resolve) => {
            Cookies.remove("authToken");
            resolve();
          }),
          new Promise<void>((resolve) => {
            Cookies.remove("authUsername");
            resolve();
          }),
          new Promise<void>((resolve) => {
            Cookies.remove("authRole");
            resolve();
          }),
          new Promise<void>((resolve) => {
            Cookies.remove("authId");
            resolve();
          }),
          new Promise<void>((resolve) => {
            Cookies.remove("authScore");
            resolve();
          }),
        ]);

        router.push("/login");
      } catch (error) {
        console.log("logout error", error);
      }
    },
    async submitLogin(loginData: LoginData) {
      try {
        const response = await Login(loginData);
        console.log(response.data);

        const token = response.data.token || "";
        const username = response.data.user.username || "";
        const role = response.data.user.roles[0] || "";
        const _id = response.data.user._id || "";
        const score = response.data.user.score || "";
        await Promise.all([
          new Promise<void>((resolve) => {
            Cookies.set("authToken", token, {
              expires: 1,
              secure: true,
              sameSite: "strict",
            });
            resolve();
          }),
          new Promise<void>((resolve) => {
            Cookies.set("authUsername", username, {
              expires: 1,
              secure: true,
              sameSite: "strict",
            });
            resolve();
          }),
          new Promise<void>((resolve) => {
            Cookies.set("authRole", role, {
              expires: 1,
              secure: true,
              sameSite: "strict",
            });
            resolve();
          }),
          new Promise<void>((resolve) => {
            Cookies.set("authId", _id, {
              expires: 1,
              secure: true,
              sameSite: "strict",
            });
            resolve();
          }),
          new Promise<void>((resolve) => {
            Cookies.set("authScore", score, {
              expires: 1,
              secure: true,
              sameSite: "strict",
            });
            resolve();
          }),
        ]);
        router.push("/");
      } catch (error: any) {
        console.log("auth error", error);
      }
    },
  },
});
