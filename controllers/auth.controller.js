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
      return res
        .status(404)
        .json({ error: "Passwords dont match" });

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
    console.log("Error in SignupController due to ", error);
  }
};

export { signup };
