"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const express_validator_1 = require("express-validator");
const RoleMiddleware_1 = __importDefault(require("../middleware/RoleMiddleware"));
const authRouter = express_1.default.Router();
authRouter.post('/registration', [
    (0, express_validator_1.check)('username', 'User name can not be empty').notEmpty(),
    (0, express_validator_1.check)('password', 'Password must be longer then 4 symbols and less then 10').isLength({ min: 4, max: 10 })
], AuthController_1.default.registration);
authRouter.put('/users/:userId', AuthController_1.default.updateUser);
authRouter.post('/login', AuthController_1.default.login);
authRouter.get('/users', (0, RoleMiddleware_1.default)(["ADMIN", "USER", "PM", "QA", "DEVELOPER", "UX"]), AuthController_1.default.getUsers);
authRouter.get('/users/:userId', AuthController_1.default.getUserById);
exports.default = authRouter;
