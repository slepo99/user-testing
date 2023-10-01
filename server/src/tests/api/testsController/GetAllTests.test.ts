import request from "supertest";
import app from "../../../app";

describe("getAll", () => {
  it("should get all tests", async () => {
    const response = await request(app).get("/api/submit-test");
    expect(response.status).toBe(200);
    expect(response.body);
  });
});
