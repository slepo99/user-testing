"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TestController_1 = __importDefault(require("../controllers/TestController"));
const testRouter = express_1.default.Router();
testRouter.post("/tests", TestController_1.default.create);
testRouter.get("/submit-test", TestController_1.default.getAll);
testRouter.get("/submit-test/:id", TestController_1.default.getOne);
exports.default = testRouter;
