<template>
  <div class="container">
    <div v-if="!login.score">
      <div v-if="currentTest">
      {{ currentTest.question }}
      <div v-for="(answer, id) in currentTest.shuffledAnswers" :key="id">
        <input
          type="radio"
          :name="answer._id"
          :id="answer._id"
          v-model="selectedAnswer"
          :value="answer"
        />
        <label :for="answer._id">{{ answer.answer }} {{ id }}</label>
      </div>
      <button @click="nextQuestion" v-if="isTestsExists" :disabled="isDisabled">
        <span v-if="isGeneralTests">Next</span>
        <span v-else-if="isLastTest">Finish</span>
      </button>
    </div>
    </div>
    <div v-else-if="login.score || score">
      <h1>You passed all tests. Your result is {{ login.score }} / 10</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTests } from "@/store/TestsStore";
import { useLogin } from "@/store/LoginStore";
import { useRegister } from "@/store/RegisterStore";
import { ref, computed, onMounted, onBeforeMount} from "vue";
import Cookies from "js-cookie";

const selectedAnswer = ref();
const login = useLogin();
const testsStore = useTests();
const register = useRegister();
const currentQuestionIndex = ref(0);
const score = ref(0);

const filteredTests = computed(() => {
  return testsStore.tests.filter((item) => item.role === login.role);
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
      console.log(score);
      try {
        await register.updateProfile({ score: score.value.toString() });
       Cookies.set("authScore", score.value.toString(), {
          expires: 1,
          secure: true,
          sameSite: "strict",
        } )

      } catch(error) {
        console.log("User data update error");
        
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
  onBeforeMount(() => {
     register.resaveScore();
  })
 onMounted( () => {
  
   testsStore.fetchTests();
  
});
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}
</style>
