import express, { Request, Response, NextFunction, Router } from "express";
import User from "../model/UserModel";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
class UserController {
  async getUsers(req: Request, res: Response) {
    const data = await User.find();
  }

  async userPostSignIn(req: Request, res: Response) {
    try {
      const data = req.body;

      const currentUser = await User.findOne({
        email: data.email,
        password: data.password,
      });

      const accessToken = jwt.sign(
        { userID: currentUser && currentUser._id },
        process.env.ACCESS_TOKEN_SECRET as Secret
      );
      res.json({ accessToken: accessToken, user: currentUser });
    } catch (error) {
      console.log(error);
    }
  }
  async userPostRegister(req: Request, res: Response) {
    try {
      const data = req.body;
      const newUser = new User(data);
      // if (error) res.json({ message: error });
      const checkExitUser = await User.findOne({ email: data.email });
      // kieemr tra xem cos ton tai hay chua
      if (checkExitUser != null) {
        res.json({ meseage: `Tên đăng kí đã tồn tại` });

        // res.json({ errRegister: "Tên đăng nhập đã tồn tai", data: data });
        return;
      }
      if (!newUser) {
        console.log("thất bại");
      } else {
        console.log(req.body, "dữ liệu đưa lên server là");
      }
      await newUser.save();
      res.json({ success: " Đăng kí thành công" });
    } catch (err) {
      console.log(err);
    }
  }
  async deleteUserds(req: Request, res: Response) {
    const idDelete = req.params._id;
    try {
      const data = await User.findOneAndDelete({});
    } catch (error) {}
  }
}
export default new UserController();
function SignOptions(error: Error | null, encoded: string | undefined): void {
  throw new Error("Function not implemented.");
}
