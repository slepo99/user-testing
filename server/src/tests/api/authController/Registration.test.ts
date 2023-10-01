import request from "supertest";
import app from "../../../app";

describe("registration", () => {
  // it("should register a new user", async () => {
  //   const response = await request(app).post("/auth/registration").send({
  //     username: "tesngIve",
  //     password: "1234",
  //     roles: "USER",
  //     score: "0",
  //   });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.message).toBe("User successfully registered");
  // });

  it("should return an error if registration fails", async () => {
    const response = await request(app).post("/auth/registration").send({
      username: "",
      password: "12",
      roles: "USER",
      score: "0",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Registration failed");
  });

  it("should return an error if password is too short", async () => {
    const response = await request(app).post("/auth/registration").send({
      username: "qwerty",
      password: "12",
      roles: "USER",
    });

    expect(response.status).toBe(400);
    const responseData = JSON.parse(response.text);
    const errorMessage =
      "Password must be longer then 4 symbols and less then 10";
    expect(responseData.errors.errors[0].msg).toEqual(errorMessage);
  });
});
