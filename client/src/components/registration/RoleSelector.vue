<template>
  <div class="container">
    <label for="role">
      <select name="role" id="role" v-model="selectedRole" @change="setRole()">
        <option
          v-for="test in testsStore.tests"
          :key="test._id"
          :value="test.role"
        >
          {{ test.role }}
        </option>
      </select>
    </label>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useTests } from "@/store/TestsStore";
const testsStore = useTests();
const selectedRole = ref("USER");
const emit = defineEmits();
function setRole() {
  emit("setRole", selectedRole.value);
}
onMounted(() => {
  testsStore.fetchTests();
  emit("setRole", selectedRole.value);
});
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  select {
    width: 100%;
    height: 30px;
    cursor: pointer;
  }
}
</style>
