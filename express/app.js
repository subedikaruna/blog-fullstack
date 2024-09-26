import express, { json } from "express";
import cors from "cors";
import { connectToMongoDb } from "./src/mongodb/connectToMongoDb.js";

import {
  createBlogController,
  deleteSpecificBlogController,
  readAllBlogController,
  readSpecificBlogController,
  updateSpecificBlogController,
} from "./src/controller/blogController.js";
import { config } from "dotenv";
import {
  createUserController,
  forgotPassword,
  loginUser,
  myProfile,
  resetPassword,
  updatePassword,
  updateProfile,
  verifyEmail,
} from "./src/controller/userController.js";
import { isAuthenticated } from "./src/middleware/isAuthenticated.js";
config();
export const expressApp = express();

expressApp.use(json());
expressApp.use(
  cors()
  //   {
  //   origin:"http://localhost:3000"
  // }
);
connectToMongoDb();
const PORT = process.env.PORT;
expressApp.listen(PORT, () => {
  console.log("port is running at 4000");
});
expressApp.post("/blog", createBlogController);
expressApp.post("/login", loginUser);
expressApp.post("/register", createUserController);
expressApp.patch("/verify-email", verifyEmail);
expressApp.get("/my-profile", isAuthenticated, myProfile);
expressApp.patch("/my-profile", isAuthenticated, updateProfile);
expressApp.patch("/update-password", isAuthenticated, updatePassword);

expressApp.post("/forgot-password", forgotPassword);
expressApp.patch("/reset-password", isAuthenticated, resetPassword);
expressApp.get("/blog", readAllBlogController);
expressApp.get("/blog/:id", readSpecificBlogController);
expressApp.patch("/blog/:id", updateSpecificBlogController);
expressApp.delete("/blog/:id", deleteSpecificBlogController);
