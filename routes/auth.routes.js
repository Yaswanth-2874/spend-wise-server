import express from "express";
import { signup } from "../controllers/auth.controller.js";
const authRoute = express.Router();

authRoute.get("/login", (req, res) => {
  res.json({ Hi: "Hello" });
});
authRoute.post("/logout", () => {});
authRoute.post("/signup", signup);

export default authRoute;
