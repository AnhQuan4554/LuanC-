import { Request, Response } from "express";
import Reward from "../model/RewardModel";
import dotenv from "dotenv";
dotenv.config();
class RewardController {
  async renderReward(req: any, res: Response) {
    try {
      const data = await Reward.find({ userID: req.userID });
      res.json({ data: data });
    } catch (error) {
      console.log(error, "loi roi");
    }
  }
  async creatReward(req: any, res: Response) {
    try {
      const data = req.body;
      const newReward = new Reward({ ...data, userID: req.userID });
      console.log(req.userID);
      await newReward.save();
    } catch (error) {
      console.log(error, "loi roi");
    }
  }
}
export default new RewardController();
