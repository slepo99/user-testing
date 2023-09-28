<template>
  <div>
    <label for="role">
      <select name="role" id="role" v-model="selectedRole">
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
onMounted(() => {
  testsStore.fetchTests();
  console.log(selectedRole);
});
</script>
<style lang="scss" scoped></style>
