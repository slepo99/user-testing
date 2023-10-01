import { defineStore } from "pinia";
import { getTests } from "@/services/testsApi";
import Test from "@/types/Tests";
export const useTests = defineStore("tests", {
  state: () => ({
    tests: [] as Test[],
    num: 123
  }),
  actions: {
    async fetchTests(): Promise<void>  {
      try {
        const tests: Test[] = await getTests();
        this.tests = tests;
      } catch (error) {
        console.error("data retrieval error", error);
        throw error;
      }
    },
  },
});
