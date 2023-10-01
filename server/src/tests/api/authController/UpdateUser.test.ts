import request from "supertest";
import app from "../../../app";

describe("updateUser", () => {
    it("should update user data", async () => {
      const userId = "6514429c67ce9e5095384b80";
      const userToUpdate = {
        score: "5",
      };

      const response = await request(app)
        .put(`/auth/users/${userId}`)
        .send(userToUpdate);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("User data updated successfully");
    });

    it("should return an error if update fails ", async () => {
      const nonExistentUserId = "6514092e4ag9c25d01bb2724";

      const response = await request(app)
        .put(`/auth/users/${nonExistentUserId}`)
        .send({
          score: "7",
        });
      const responseData = JSON.parse(response.text);
      expect(response.statusCode).toBe(500);
      expect(responseData.message).toBe("Internal server error");
    });

    it("should return an error if user is not found", async () => {
      const userToUpdate = {
        userId: "lgkkk24n4kn4",
        username: "",
        password: "",
        roles: "",
        score: "",
      };

      const response = await request(app)
        .put(`/auth/users/${userToUpdate.userId}`)
        .send(userToUpdate);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });