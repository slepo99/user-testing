<template>
  <div class="container">
    <div v-for="(ques, id) in currentQuestion" :key="id">
      {{ ques.question }}
    </div>
    <!-- <div class="tests-box" v-for="item in filteredTests" :key="item._id">
      <div class="role">
        {{ item.role }}
      </div>
      <div class="tests" v-for="(test, id) in item.tests" :key="id">
        {{ id + 1 }}
        {{ test.question }}

        <div class="answers" v-for="(answer, id) in test.answers" :key="id">
          {{ answer.answer }}
        </div>
      </div>
    </div> -->
    <button @click="nextQuestion">Next</button>
  </div>
</template>
<script lang="ts" setup>
import { useTests } from "@/store/TestsStore";
import { useLogin } from "@/store/LoginStore";
import { onMounted, ref, computed } from "vue";
const login = useLogin();
const testsStore = useTests();
const currentQuestionIndex = ref(0);
const filteredTests = computed(() => {
  return testsStore.tests.filter((item) => item.role === login.role);
});
const currentQuestion = computed(() => {
  return filteredTests.value.map(
    (item) => item.tests[currentQuestionIndex.value]
  );
});
const nextQuestion = () => {
  if (currentQuestionIndex.value < filteredTests.value[0].tests.length - 1) {
    currentQuestionIndex.value++;
  }
};
onMounted(() => {
  testsStore.fetchTests();
  filteredTests;
  console.log(currentQuestionIndex.value);
});
</script>
<style lang="scss" scoped>
.container {
  margin-top: 50px;
}
</style>
