import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
  try {
    const cookie = req.cookies.jwtToken;
    if (!cookie) return res.status(404).json({ error: "No Token Provided" });
    const decoded = jwt.verify(cookie, process.env.JWT_SECRET_KEY);
    if (!decoded)
      return res.status(404).json({ error: "Invalid Token Provided" });
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(400).json({ error: "User does not exist" });
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in verifyUser middleware due to ", error);
    return res.json({ error: "Internal server error" });
  }
};

export default verifyUser;
