import express from "express";
import mongoose from "mongoose";
import testRouter from "./routes/testRoutes";
import authRouter from "./routes/authRoutes";
import cors from 'cors'
import swaggerDocument from "./swagger.json"
import swaggerUi from 'swagger-ui-express';
const app = express();
const dbUrl ="mongodb+srv://slepo:slepo1606@cluster0.axlzehv.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;
app.use(cors({origin: '*'}));
app.use(express.json());
app.use("/api", testRouter);
app.use('/auth', authRouter)
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
export default app; 

async function startApp() {
  try {
    await mongoose.connect(dbUrl);
    if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log("server works on " + PORT + " port");
    });
  }
  } catch (e) {
    console.log(e);
  }
}

startApp();
