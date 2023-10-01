<template>
  <div lazy class="container">
    <div v-if="!storageScore">
      <h2>{{ currentQuestionIndex }} / 10</h2>
      <div v-if="currentTest">
        {{ currentTest.question }}
        <div
          v-for="(answer, id) in currentTest.shuffledAnswers"
          :key="answer._id"
        >
          <input
            type="radio"
            :name="answer._id"
            :id="answer._id"
            v-model="selectedAnswer"
            :value="answer"
          />
          <label :for="answer._id">{{ answer.answer }} {{ id }}</label>
        </div>
        <button
          @click="nextQuestion"
          v-if="isTestsExists"
          :disabled="isDisabled"
        >
          <span v-if="isGeneralTests">Next</span>
          <span v-else-if="isLastTest">Finish</span>
        </button>
      </div>
    </div>
    <div v-else-if="storageScore.length">
      <h1>You passed all tests. Your result is {{ storageScore }} / 10</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTests } from "@/store/TestsStore";
import { useLogin } from "@/store/LoginStore";
import { useRegister } from "@/store/RegisterStore";
import { ref, computed, onMounted} from "vue";

const selectedAnswer = ref();
const login = useLogin();
const testsStore = useTests();
const register = useRegister();
const currentQuestionIndex = ref(0);
const score = ref(0);
const storageScore = ref(localStorage.getItem("authScore"));
const role = ref(localStorage.getItem("authRole"))

const filteredTests = computed(() => {
  return testsStore.tests.filter((item) => item.role == role.value);
});

const currentTest = computed(() => {
  const tests = filteredTests.value.flatMap((item) => item.tests);

  if (
    currentQuestionIndex.value >= 0 &&
    currentQuestionIndex.value < tests.length
  ) {
    const test = tests[currentQuestionIndex.value];
    const answers = [...test.answers];

    const shuffledAnswers = answers.slice();
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAnswers[i], shuffledAnswers[j]] = [
        shuffledAnswers[j],
        shuffledAnswers[i],
      ];
    }
    return {
      ...test,
      shuffledAnswers: shuffledAnswers,
    };
  }

  return null;
});

async function nextQuestion() {
  if (currentQuestionIndex.value < filteredTests.value[0].tests.length) {
    currentQuestionIndex.value++;
    if (selectedAnswer.value.isTrue == true) {
      score.value++;
    }
    if (currentQuestionIndex.value == filteredTests.value[0].tests.length) {
      try {
        await register.updateProfile({ score: score.value.toString() });

        localStorage.setItem("authScore", score.value.toString());
        location.reload();
      } catch (error) {
        console.log("User data update error", error);
      }
    }
    selectedAnswer.value = null;
  }
}
const isDisabled = computed(() => {
  return selectedAnswer.value == null;
});
const isTestsExists = computed(() => {
  return currentQuestionIndex.value < filteredTests.value[0].tests.length;
});
const isGeneralTests = computed(() => {
  return currentQuestionIndex.value < filteredTests.value[0].tests.length - 1;
});
const isLastTest = computed(() => {
  return currentQuestionIndex.value <= filteredTests.value[0].tests.length;
});

onMounted(async () => {
  await register.resaveScore();
  await testsStore.fetchTests();
});
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}
</style>
