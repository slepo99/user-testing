<template>
  <div class="container">
    <form class="auth-form">
      <label for="username"><h4>Login:</h4></label>
      <input
        type="text"
        id="username"
        v-model="userData.username"
        placeholder="Enter username"
      />
      <label for="password"><h4>Password:</h4></label>
      <input
        type="text"
        id="password"
        v-model="userData.password"
        placeholder="Enter password"
      />
      <h4>Choose your specialisation:</h4>
      <RoleSelector @setRole="getRole" />
      <button @click.prevent="Register()">Sign up</button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import RoleSelector from "@/components/registration/RoleSelector.vue";
import { useRegister } from "@/store/RegisterStore";

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

const getRole = (value: string) => {
  userData.roles = value;
  console.log(userData.roles);
};

async function Register() {
  try {
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
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    button {
      width: 120px;
      height: 25px;
    }
    input {
      width: 220px;
      height: 40px;

    }

    
  }
}
</style>
