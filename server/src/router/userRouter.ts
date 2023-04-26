import express, { Router, Request, Response, NextFunction } from "express";
import userControl from "../controller/userControl";

const routerUser = Router();
routerUser.post("/signin", userControl.userPostSignIn);
routerUser.post("/register", userControl.userPostRegister);

// routerUser.delete("/",userControl)
routerUser.get("/", userControl.getUsers);
export default routerUser;
