<template>
  <div class="container">
    <form class="auth-form">
      <label for="username"><h3>Username:</h3></label>
      <input
        type="text"
        id="username"
        v-model="loginData.username"
        placeholder="Enter username"
      />
      <label for="password"><h3>Password:</h3> </label>
      <input
        type="password"
        id="password"
        v-model="loginData.password"
        placeholder="Enter password"
      />
      <button class="btn" @click.prevent="Login()" :disabled="v$.$invalid">
        Sign in
      </button>
    </form>
    <div>
      Don't have an account yet?
      <router-link to="/register">sign up.</router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {  reactive } from "vue";
import { useLogin } from "@/store/LoginStore";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
const login = useLogin();

interface LoginData {
  username: string;
  password: string;
}

const loginData = reactive<LoginData>({
  username: "",
  password: "",
});

const rules = {
  username: { required, minLength: minLength(3) },
  password: { required, minLength: minLength(4) },
};
const v$ = useVuelidate(rules, loginData);
async function Login() {
  try {
    v$.value.$touch;
    if (v$.value.$invalid) {
      return;
    }
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
    margin-bottom: 30px;
    input {
      font-size: 16px;
    }
    .btn {
      margin-top: 20px;
    }
  }
}
</style>
