import jwt, { Secret } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json("Access token not found");
  }
  try {
    const decode: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    );
    req.userID = decode.userID; // userID là cái filed được tạo khi đăng nhập
    // sigin ở phía client
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json("Invalid Token");
  }
};
export default verifyToken;
