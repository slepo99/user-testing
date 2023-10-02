<template>
  <div class="container">
    <form class="auth-form">
      <label for="username"><h4>Username:</h4></label>
      <input
        type="text"
        id="username"
        v-model="userData.username"
        placeholder="Enter username"
      />
      <label for="password"><h4>Password:</h4></label>
      <input
        class="input"
        type="text"
        id="password"
        v-model="userData.password"
        placeholder="Enter password"
      />
      <h4>Choose your specialisation:</h4>
      <RoleSelector @setRole="getRole" />
      <button @click.prevent="Register()" :disabled="v$.$invalid">Sign up</button>
      <div class="login-link" >
        Alredy have an account ? <router-link to="/login">sign in.</router-link >
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import RoleSelector from "@/components/registration/RoleSelector.vue";
import { useRegister } from "@/store/RegisterStore";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

const registration = useRegister();

interface UserData {
  username: string;
  password: string;
  roles: string;
}
const userData = reactive<UserData>({
  username: "",
  password: "",
  roles: "",
});
const rules = {
  username: { required, minLength: minLength(3) },
  password: { required, minLength: minLength(4) },
};

const v$ = useVuelidate(rules, userData);
const getRole = (value: string) => {
  userData.roles = value;
  console.log(userData.roles);
};

async function Register() {
  try {
    v$.value.$touch;
    if (v$.value.$invalid) {
      return;
    }
    registration.submitRegistration(userData);
  } catch (error) {
    console.error("Error on auth component", error);
    throw error;
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 230px;
  margin-bottom: 20px;

  .auth-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-bottom: 30px;
    height: 200px;
    button {
      cursor: pointer;
    }
    input {
      width: 100%;
      padding: 0;
      height: 40px;
      font-size: 16px;
    }
    .login-link {
      margin-top: 20px;
    }
  }
}
</style>
