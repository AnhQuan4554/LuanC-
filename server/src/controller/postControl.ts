import { Request, Response } from "express";
import Post from "../model/PostModel";
import dotenv from "dotenv";
dotenv.config();
class postController {
  async renderPost(req: any, res: Response) {
    const data = await Post.find({ userID: req.userID });
    res.json({ data: data });
  }
  async creatPost(req: any, res: Request) {
    try {
      const data = req.body;
      const newPost = new Post({ ...data, userID: req.userID });
      await newPost.save();
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(req: any, res: Request) {
    try {
      const { id } = req.body;
      await Post.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new postController();
