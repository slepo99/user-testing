import TestModel, { ITest } from "../schema/Test";

class TestService {
  async create(test: Partial<ITest>): Promise<ITest> {
    try {
      const createdTest = new TestModel(test);
      await createdTest.save();
      return createdTest;
    } catch (error) {
      console.error("Error creating test:", error);
      throw new Error("Failed to create test.");
    }
  }

  async getAll(): Promise<ITest[]> {
    try {
      const tests = await TestModel.find();
      return tests;
    } catch (error) {
      console.error("Error getting tests:", error);
      throw new Error("Failed to fetch tests.");
    }
  }

  async getOne(id: string): Promise<ITest | null> {
    try {
      if (!id) {
        throw new Error("ID undefined");
      }
      const test = await TestModel.findById(id);
      if (!test) {
        throw new Error("Test not found");
      }
      return test;
    } catch (error) {
      console.error("Error getting test:", error);
      throw new Error("Failed to fetch test.");
    }
  }
}

export default new TestService();
