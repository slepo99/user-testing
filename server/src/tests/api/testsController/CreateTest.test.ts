import request from "supertest";
import app from "../../../app";

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
      const responseData = JSON.parse(response.text);
      expect(response.status).toBe(200);
      expect(responseData.body)
    });
  });