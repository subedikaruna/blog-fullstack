import { secretkey } from "../../config.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  try {
    //get token from Postman
    let tokenString = req.headers.authorization;
    if (!tokenString) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    //verify token
    let user = await jwt.verify(token, secretkey);
    //get id fromm token
    let _id = user._id;
  
    //pass value to next middleware
    req._id = _id;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "token not valid",
    });
  }
};
