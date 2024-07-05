import jwt from "jsonwebtoken";

const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
  res.cookie("jwtToken", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
    httpOnly: true,
  });
};

export default generateToken;
