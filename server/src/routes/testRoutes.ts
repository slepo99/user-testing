import express from "express";
import TestController from "../controllers/TestController";
const testRouter = express.Router();
testRouter.post("/tests", TestController.create);
testRouter.get("/submit-test", TestController.getAll);
testRouter.get("/submit-test/:id", TestController.getOne);
export default testRouter;
