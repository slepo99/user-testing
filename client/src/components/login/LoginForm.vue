<template>
  <div class="container">
    <form class="auth-form">
      <label for="username">Login:</label>
      <input
        type="text"
        id="username"
        v-model="loginData.username"
        placeholder="Enter username"
      />
      <label for="password">Password:</label>
      <input
        type="text"
        id="password"
        v-model="loginData.password"
        placeholder="Enter password"
      />
      <button @click.prevent="Login()">Submit</button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { useLogin } from "@/store/LoginStore";
const login = useLogin();
interface LoginData {
  username: string;
  password: string;
}

const loginData = reactive<LoginData>({
  username: "",
  password: "",
});

async function Login() {
  try {
    await login.submitLogin(loginData);
  } catch (error) {
    console.log("Login error", error);
    throw error;
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 230px;
  margin-bottom: 200px;
  .auth-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
}
</style>
