import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const Main = () => import("@/views/Main.vue");
const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Main,
    beforeEnter: (_to, _from, next) => {
      if (localStorage.getItem("authToken")) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (_to, _from, next) => {
      if (!localStorage.getItem("authToken")) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: (_to, _from, next) => {
      if (!localStorage.getItem("authToken")) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
//process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
