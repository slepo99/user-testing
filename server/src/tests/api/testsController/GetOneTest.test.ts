import request from "supertest";
import app from "../../../app";

describe("getOne", () => {
    it("should get one test", async () => {
      const testId = '6514651c8e1f7b78c0d015d8'
      const response = await request(app).get(`/api/submit-test/${testId}`)
      expect(response.status).toBe(200)
      expect(response.body)
    })
  });