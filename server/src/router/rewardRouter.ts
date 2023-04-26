import express, { Router, Request, Response, NextFunction } from "express";
import RewardController from "../controller/rewardControl";
import verifyToken from "../middleware/User";

const routerReward = Router();
routerReward.get("/", verifyToken, RewardController.renderReward);
routerReward.post("/creat-reward", verifyToken, RewardController.creatReward);
export default routerReward;
