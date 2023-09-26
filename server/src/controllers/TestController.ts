import { Request, Response } from "express";
import TestService from "../services/TestService";
import { ITest } from "../schema/Test";

class TestController {
  async create(req: Request, res: Response) {
    try {
      const test = await TestService.create(req.body as Partial<ITest>);
      res.json(test);
    } catch (error) {
      console.error("Error creating test:", error);
      res.status(500).json({ error: "Failed to create test." });
    }
  }

  async getAll(req: Request, res: Response) {
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
      const tests = await TestService.getAll();
      res.json(tests);
    } catch (error) {
      console.error("Error getting tests:", error);
      res.status(500).json({ error: "Failed to fetch tests." });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: "ID undefined" });
        return;
      }
      const test = await TestService.getOne(id);
      if (!test) {
        res.status(404).json({ error: "Test not found" });
        return;
      }
      res.json(test);
    } catch (error) {
      console.error("Error getting test:", error);
      res.status(500).json({ error: "Failed to fetch test." });
    }
  }
}

export default new TestController();
