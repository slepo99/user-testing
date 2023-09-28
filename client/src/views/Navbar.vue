<template>
  <div class="container">
    <div class="logout">
      <button @click="Logout">Logout</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLogin } from "@/store/LoginStore";
const login = useLogin();
function Logout() {
  return login.submitLogout();
}
</script>
<style lang="scss" scoped>
.container {
  height: 50px;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: black;
}
</style>
