import { createRouter, createWebHistory, RouteRecordRaw  } from 'vue-router'
const Main = () => import("@/views/Main.vue")
const Login = () => import("@/views/Login.vue")
const Register = () => import("@/views/Register.vue")
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
//process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),