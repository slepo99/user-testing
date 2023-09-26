import express from "express";
import mongoose from "mongoose";
import testRouter from "./routes/testRoutes";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const dbUrl ="mongodb+srv://slepo:slepo1606@cluster0.axlzehv.mongodb.net/?retryWrites=true&w=majority";
app.use("/api", testRouter);

async function startApp() {
  try {
    await mongoose.connect(dbUrl);
    app.listen(PORT, () => {
      console.log("server works on " + PORT + " port");
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
