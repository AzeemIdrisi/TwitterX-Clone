import User from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    //basic validation
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User already exists.",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 4);
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {}
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }
    const user = await User.findOne({ email: email });
    console.log("user datea : ");
    console.log(user);
    console.log("user datea : ");
    if (!user) {
      return res.status(401).json({
        message: "User does not exist with this email.",
        success: false,
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }
    const tokenData = {
      userID: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .cookie("token", token, { expriresIn: "1d", httpOnly: true })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
