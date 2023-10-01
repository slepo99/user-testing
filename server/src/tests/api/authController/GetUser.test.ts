import request from "supertest";
import app from "../../../app";

describe("getUser", () => {
    it("should return user", async () => {
      const userId = "6514429c67ce9e5095384b80";
      const response = await request(app).get(`/auth/users/${userId}`);
      const responseData = JSON.parse(response.text);
      expect(response.statusCode).toBe(200);
      expect(responseData.username).toBe(responseData.username);
    });

    it("should not find user", async () => {
      const userData = {
        userId: "5f6237c4b2ac5f0470b99544"
      }
      const userId = "6514429c67ce9e5095388v80";
      const response = await request(app).get(`/auth/users/${userData.userId}`);
      const responseData = JSON.parse(response.text);
      expect(response.statusCode).toBe(404);
      expect(responseData.message).toBe("User not found");
    });
  });