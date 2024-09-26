import { model } from "mongoose";
import { blogSchema } from "./blogSchema.js";
import { userSchema } from "./userSchema.js";

export const Blog = model("Blog", blogSchema);
 export const User = model("User", userSchema);
