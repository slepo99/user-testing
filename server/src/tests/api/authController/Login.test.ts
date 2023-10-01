import request from "supertest";
import app from "../../../app";

describe("login", () => {
  it("should log in a user and return a token", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "ADMIN",
      password: "1234",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should return an error if user not found", async () => {
    const userData = {
      username: "qwe",
      password: "1234",
    };
    const response = await request(app)
      .post("/auth/login")
      .send({
        ...userData,
      });
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(400);
    expect(responseData.message).toEqual(`User ${userData.username} not found`);
  });

  it("should return an error if password wrong", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "ADMIN",
      password: "123",
    });
    const responseData = JSON.parse(response.text);
    expect(response.statusCode).toBe(400);
    expect(responseData.message).toBe("Wrong password");
  });
});
