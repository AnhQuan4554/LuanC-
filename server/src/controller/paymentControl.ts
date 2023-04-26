import express, { Request, Response, NextFunction, Router } from "express";
import PaymentModel from "../model/PaymentModel";
import dotenv from "dotenv";
dotenv.config();
class PaymentController {
  async renderPayment(req: any, res: Response) {
    try {
      const data = await PaymentModel.find();

      res.json({ data: data });
    } catch (error) {
      console.log(error, "loi roi");
    }
  }
  async deleteById(req: any, res: Response) {
    try {
      const data = req.body;
      const { idDelete } = data;
      await PaymentModel.findByIdAndDelete(idDelete);
      console.log("delete success");
    } catch (error) {
      console.log(error, "loi roi");
    }
  }
  async deleteAll(req: any, res: Response) {
    try {
      await PaymentModel.deleteMany({});
      console.log("delete success All");
    } catch (error) {
      console.log(error, "loi roi");
    }
  }
  async creatPayment(req: any, res: Response) {
    const day = new Date();
    const stringDay =
      `${day.getDate()} ${day.getMonth()} ${day.getFullYear()}` as string;

    try {
      const data = req.body;
      console.log(data);
      const newPay = new PaymentModel({
        ...data,
        status: "Paid",
        usedDate: stringDay,
      });
      await newPay.save();
    } catch (error) {
      console.log("chua luu dc");
    }
  }
  async editPayment(req: any, res: Response) {
    try {
      const data = await req.body;
      // console.log(data);
      const { idItemEdit, contentEvent, money } = data;
      await PaymentModel.findOneAndUpdate(idItemEdit, {
        $set: { contentEvent, money },
      });
      console.log("Edit success");
    } catch (error) {
      console.log(error, "loi roi");
    }
  }
}
export default new PaymentController();
