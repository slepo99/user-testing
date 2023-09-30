import request from "supertest";
import app from "../app";

describe("TestsController", () => {
  describe("create", () => {
    it("should create a new test", async () => {
      const testData:any = {
        role: "PM",
        tests: [
          {
            question: "What is 2 + 2?",
            answers: [
              { answer: "3", isTrue: false },
              { answer: "4", isTrue: true },
              { answer: "5", isTrue: false },
            ],
          },
        ],
      };
      const response = await request(app).post("/api/tests").send(testData);
      expect(response.status).toBe(200);
    });
  });
   describe("getAll", () => {
    it("should get all tests", async () => {
      const response = await request(app).get('/api/submit-test')
      expect(response.status).toBe(200)

    })
   });
  describe("getOne", () => {
    it("should get one test", async () => {
      const testId = '6514651c8e1f7b78c0d015d8'
      const response = await request(app).get(`/api/submit-test/${testId}`)
      expect(response.status).toBe(200)
    })
  });
});
