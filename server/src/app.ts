import express, { Express, Request, Response, Application } from "express";
import mongoose from "mongoose";
import routerUser from "./router/userRouter";
import indexRouter from "./router/index";
import postRouter from "./router/postRouter";
import locationRouter from "./router/locationRouter";
import rewardRouter from "./router/rewardRouter";
import paymentRouter from "./router/paymentRouter";
import { config } from "dotenv";
import cors from "cors";
config();
const app: Application = express();

const port = 5000;
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Luan");
    console.log("connect Success");
  } catch (error) {
    console.log("loi", error);
  }
};
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/payment", paymentRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
