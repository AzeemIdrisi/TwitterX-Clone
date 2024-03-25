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
    console.log("Login Success.");
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

export const Logout = (req, res) => {
  console.log("Logout Success.");
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "User logged out successfully.",
    success: true,
  });
};

export const getProfile = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Get user profile except password from mongoDB
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const id = req.body.id;
    const otherUsers = await User.find({ _id: { $ne: id } }).select(
      "-password"
    );
    if (!otherUsers) {
      return res.status(401).json({
        message: "Other users not found",
        success: false,
      });
    }
    return res.status(200).json({ otherUsers });
  } catch (error) {
    console.log(error);
  }
};

export const follow = async (req, res) => {
  try {
    const loggedInUserID = req.body.id;
    const userID = req.params.id;

    if (!loggedInUserID || !userID) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }
    const user = await User.findById(userID);
    const loggedInUser = await User.findById(loggedInUserID);

    if (!user) {
      return res.status(401).json({
        message: "User does not exist.",
        success: false,
      });
    }
    // Checking if user exist in followers
    if (!user.followers.includes(loggedInUserID)) {
      await user.updateOne({
        $push: { followers: loggedInUserID },
      });
      await loggedInUser.updateOne({
        $push: { following: userID },
      });

      console.log(`${loggedInUser.name} is now following ${user.name}.`);
      return res.status(200).json({
        message: `${loggedInUser.name} is now following ${user.name}.`,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: `${loggedInUser.name} is already following ${user.name}.`,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const unfollow = async (req, res) => {
  try {
    const loggedInUserID = req.body.id;
    const userID = req.params.id;

    if (!loggedInUserID || !userID) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }
    const user = await User.findById(userID);
    const loggedInUser = await User.findById(loggedInUserID);

    if (!user) {
      return res.status(401).json({
        message: "User does not exist.",
        success: false,
      });
    }
    // Checking if user exist in followers
    if (user.followers.includes(loggedInUserID)) {
      await user.updateOne({
        $pull: { followers: loggedInUserID },
      });
      await loggedInUser.updateOne({
        $pull: { following: userID },
      });

      console.log(`${loggedInUser.name} unfollowed ${user.name}.`);
      return res.status(200).json({
        message: `${loggedInUser.name} unfollowed ${user.name}.`,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: `${loggedInUser.name} was not following ${user.name}.`,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
