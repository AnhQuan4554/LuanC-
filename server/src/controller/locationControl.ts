import express, { Request, Response, NextFunction, Router } from "express";
import dotenv from "dotenv";
import Location from "../model/LocationModel";
dotenv.config();
class locationController {
  async renderLocation(req: any, res: Response) {
    try {
      // req.userID được lấy từ khi  ở form đăng nhập
      /*  khi kí jwt bằng sign thì mình tự định nghĩa key userID
     và khi verify thi thì cái decode là 1 object chứa payload
    của token cùng với key "userID" mà minhg tự thêm 
     */
      const data = await Location.find({ userID: req.userID });
      data && res.json({ data: data, userID: req.userID });
      // const authHeader = req.headers.authorization;
    } catch (error) {
      console.log(error, "Khong lay duoc du lieu LOcation");
      res.json("Khong Lay dc du lieu");
    }
  }
  async creatLocation(req: any, res: Response) {
    try {
      const data = req.body;
      const newLocation = new Location({ ...data, userID: req.userID });
      console.log(data, "data Location");
      await newLocation.save();
    } catch (error) {
      console.log(error, "Khong tao duoc");
    }
  }
  async deleteLocation(req: any, res: Response) {
    try {
      const { id } = req.body;
      await Location.findByIdAndDelete(id);
    } catch (error) {
      console.log(error, "Khong xóa duoc");
    }
  }
}
export default new locationController();
