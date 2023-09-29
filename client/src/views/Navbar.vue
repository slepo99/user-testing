<template>
  <div class="container">
    <div class="message">
      <h3>Name "{{ login.username }}"</h3>
      <h3>Specialization: {{ login.role }}</h3>
    </div>
    <div class="logout">
      <button @click="Logout">Logout</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLogin } from "@/store/LoginStore";
const login = useLogin();
async function Logout() {
 await login.submitLogout();
}
</script>
<style lang="scss" scoped>
.container {
  height: 50px;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    position: fixed;
    background-color: black;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    .message {
      padding: 0 0 0 40px;
      display: flex;
    gap: 40px;
    flex-direction: row;
    justify-content: center;
    }
    .logout { 
     padding: 0 40px 0 0 
    }
}
</style>
