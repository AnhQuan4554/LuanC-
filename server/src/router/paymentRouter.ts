import express, { Router, Request, Response, NextFunction } from "express";
import paymentControl from "../controller/paymentControl";
const router = Router();
router.get("/", paymentControl.renderPayment);
router.post("/creatPayment", paymentControl.creatPayment);
router.post("/deleteById", paymentControl.deleteById);
router.delete("/deleteAll", paymentControl.deleteAll);
router.patch("/editPayment", paymentControl.editPayment);
export default router;
