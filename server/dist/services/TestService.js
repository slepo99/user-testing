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
const Test_1 = __importDefault(require("../schema/Test"));
class TestService {
    create(test) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdTest = new Test_1.default(test);
                yield createdTest.save();
                return createdTest;
            }
            catch (error) {
                console.error("Error creating test:", error);
                throw new Error("Failed to create test.");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tests = yield Test_1.default.find();
                return tests;
            }
            catch (error) {
                console.error("Error getting tests:", error);
                throw new Error("Failed to fetch tests.");
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new Error("ID undefined");
                }
                const test = yield Test_1.default.findById(id);
                if (!test) {
                    throw new Error("Test not found");
                }
                return test;
            }
            catch (error) {
                console.error("Error getting test:", error);
                throw new Error("Failed to fetch test.");
            }
        });
    }
}
exports.default = new TestService();
