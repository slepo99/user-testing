"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function authMiddleware(req, res, next) {
    var _a;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'User not authorized' });
        }
        const decodedData = jsonwebtoken_1.default.verify(token, config_1.default);
        req.user = decodedData;
        next();
    }
    catch (e) {
        console.error(e);
        return res.status(403).json({ message: 'User not authorized' });
    }
}
exports.default = authMiddleware;
