<template>
  <div class="container">
    <div class="tests-box" v-for="item in testsStore.tests" :key="item._id">
      <div class="role">
        {{ item.role }}
      </div>
      <div class="tests" v-for="(test, id) in item.tests" :key="id">
        {{ id + 1 }}
        {{ test.question }}
        <div class="answers" v-for="(answer, id) in test.answers" :key="id">
          {{ answer.answer }}
          {{ answer.isTrue }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTests } from "@/store/TestsStore";
import { onMounted } from "vue";
const testsStore = useTests();
onMounted(() => {
  testsStore.fetchTests();
});
</script>
<style lang="scss" scoped></style>
