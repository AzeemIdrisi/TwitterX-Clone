import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

dotenv.config({ path: ".env" });
const app = express();
databaseConnection();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello Zenix",
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
