import request from "supertest";
import app from "../app";

describe("AuthController", () => {
   describe("registration", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/auth/registration").send({
        username: "tesngIve",
        password: "1234",
        roles: "USER",
        score: "0",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("User successfully registered");
    });

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
  });

  describe("login", () => {
    it("should log in a user and return a token", async () => {
      const response = await request(app).post("/auth/login").send({
        username: "ADMIN",
        password: "1234",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return an error if login fails", async () => {
      const response = await request(app).post('/auth/login').send({
        username: 'qwe',
        password: '1234'
      })
      expect(response.statusCode).toBe(400);
    });
  });

  describe("updateUser", () => {
    it("should update user data", async () => {
const userId = "6514429c67ce9e5095384b80"
      const userToUpdate = {
        score: "5",
      };

      const response = await request(app)
        .put(`/auth/users/${userId}`)
        .send(userToUpdate);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("User data updated successfully");
    });

    it("should return an error if user is not found", async () => {
      const nonExistentUserId = "6514092e4ag9c25d01bb2724";

      const response = await request(app)
        .put(`/auth/users/${nonExistentUserId}`)
        .send({
          score: "7",
        });

      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe("Internal server error");
    });

    it("should return an error if update fails", async () => {
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
  describe("getUser", () => {
    it('should return user', async () => {
      const userId = '6514429c67ce9e5095384b80'
      const response = await request(app)
      .get(`/auth/users/${userId}`)
      expect(response.statusCode).toBe(200)
    });
    it('should not find user' , async () => {
      const userId = '6514429c67ce9e5095388v80'
      const response = await request(app)
      .get(`/auth/users/${userId}`)
      expect(response.statusCode).toBe(500)
      expect(response.body.message).toBe("Internal server error")
    })
  })
});
