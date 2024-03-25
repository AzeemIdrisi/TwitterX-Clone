import JsonWebTokenError from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../env" });

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated.",
        status: false,
      });
    }

    const decode = await JsonWebTokenError.verify(
      token,
      process.env.TOKEN_SECRET
    );
    req.user = decode.userID;
    console.log("Authorisation complete");
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
