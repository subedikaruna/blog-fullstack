import { Schema } from "mongoose";

export const userSchema = Schema({
  name: {
    type: String,
    //required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    //required: true,
  },
  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
    //required: true,
  },
  isVerifiedEmail: {
    type: Boolean,
    default: false,
  },
});
