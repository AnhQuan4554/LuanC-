import express, { Router, Request, Response, NextFunction } from "express";
import postController from "../controller/postControl";
const router = Router();
router.get("/", (req, res) => {
  res.send("HOME HOME");
});
export default router;
