"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../schema/User"));
const Role_1 = __importDefault(require("../schema/Role"));
const config_1 = __importDefault(require("../config/config"));
const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles,
    };
    return jsonwebtoken_1.default.sign(payload, config_1.default, { expiresIn: "24h" });
};
class AuthController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
                res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ message: "Registration failed", errors });
                }
                const { username, password, roles, score } = req.body;
                const candidate = yield User_1.default.findOne({ username });
                if (candidate) {
                    return res
                        .status(400)
                        .json({ message: "User with the same name already exists" });
                }
                const hashPassword = bcryptjs_1.default.hashSync(password, 7);
                const userRole = yield Role_1.default.findOne({ value: roles });
                const user = new User_1.default({
                    username,
                    password: hashPassword,
                    roles: [userRole.value],
                    score: "",
                });
                yield user.save();
                return res.json({ message: "User successfully registered" });
            }
            catch (e) {
                console.error(e);
                res.status(400).json({ message: "Registration error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
                res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                const { username, password } = req.body;
                const user = yield User_1.default.findOne({ username });
                if (!user) {
                    return res.status(400).json({ message: `User ${username} not found` });
                }
                const validPassword = bcryptjs_1.default.compareSync(password, user.password);
                if (!validPassword) {
                    return res.status(400).json({ message: "Wrong password" });
                }
                const token = generateAccessToken(user._id, user.roles);
                return res.json({ token, user });
            }
            catch (e) {
                console.error(e);
                res.status(400).json({ message: "Login error" });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
                res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                const users = yield User_1.default.find();
                res.json(users);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { username, password, roles, score } = req.body;
                const user = yield User_1.default.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                if (username) {
                    user.username = username;
                }
                if (password) {
                    const hashPassword = bcryptjs_1.default.hashSync(password, 7);
                    user.password = hashPassword;
                }
                if (roles) {
                    const userRole = yield Role_1.default.findOne({ value: roles });
                    user.roles = [userRole.value];
                }
                if (score) {
                    user.score = score;
                }
                yield user.save();
                return res.json({ message: "User data updated successfully" });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const user = yield User_1.default.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json(user);
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.default = new AuthController();
