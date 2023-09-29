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
const TestService_1 = __importDefault(require("../services/TestService"));
class TestController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const test = yield TestService_1.default.create(req.body);
                res.json(test);
            }
            catch (error) {
                console.error("Error creating test:", error);
                res.status(500).json({ error: "Failed to create test." });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
                res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                const tests = yield TestService_1.default.getAll();
                res.json(tests);
            }
            catch (error) {
                console.error("Error getting tests:", error);
                res.status(500).json({ error: "Failed to fetch tests." });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ error: "ID undefined" });
                    return;
                }
                const test = yield TestService_1.default.getOne(id);
                if (!test) {
                    res.status(404).json({ error: "Test not found" });
                    return;
                }
                res.json(test);
            }
            catch (error) {
                console.error("Error getting test:", error);
                res.status(500).json({ error: "Failed to fetch test." });
            }
        });
    }
}
exports.default = new TestController();
