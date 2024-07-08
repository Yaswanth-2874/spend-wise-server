import User from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import generateToken from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(404).json({ error: "Username Already exists" });
    }
    if (password.length <= 5) {
      return res.status(404).json({ error: "Password too short" });
    }
    if (password !== confirmPassword)
      return res.status(404).json({ error: "Passwords dont match" });

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      avatar: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in Signup Controller due to ", error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordValid)
      return res.status(401).json({ error: "Username or Password wrong" });
    await generateToken(user._id, res);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error in Login Controller due to ", error);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwtToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller due to ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { signup, login, logout };
