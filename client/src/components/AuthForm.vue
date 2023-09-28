<template>
  <div class="container">
    <form class="auth-form">
      <label for="username">Login:</label>
      <input
        type="text"
        id="username"
        v-model="loginValue"
        placeholder="Enter username"
      />
      <label for="password">Password:</label>
      <input
        type="text"
        id="password"
        v-model="passwordValue"
        placeholder="Enter password"
      />
      <slot></slot>
      <button>Submit</button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const loginValue = ref<string>("");
const passwordValue = ref<string>("");
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
