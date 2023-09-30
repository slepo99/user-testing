import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../schema/User";
import Role from "../schema/Role";
import secret from "../config/config";

const generateAccessToken = (id: string, roles: string[]) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration failed", errors });
      }
      const { username, password, roles, score } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with the same name already exists" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: roles });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole!.value],
        score: "",
      });
      await user.save();
      return res.json({ message: "User successfully registered" });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: "Wrong password" });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, user });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.error(e);
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { username, password, roles, score } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({message: "User not found" });
      }

      if (username) {
        user.username = username;
      }
      if (password) {
        const hashPassword = bcrypt.hashSync(password, 7);
        user.password = hashPassword;
      }
      if (roles) {
        const userRole = await Role.findOne({ value: roles });
        user.roles = [userRole!.value];
      }
      if (score) {
        user.score = score;
      }

      await user.save();

      return res.json({ message: "User data updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getUserById(req, res) {
    try {
      const { userId } = req.params; 
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }  
      res.json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new AuthController();
