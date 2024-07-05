import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    avatar: { type: String, required: true, default: "" },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);
export default User;
