import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import { connect2DB } from "./db/connect.js";
import { userRouter } from "./routes/user.routes.js";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

const app = express();

const PORT = process.env.PORT || 3000;

// connect to database
connect2DB();

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust the frontend port as necessary
    credentials: true,
  })
);

app.use(express.json());

// someone: chrome address bar ye type hoga
// other: kya type hoga??
// someone: ye http://localhost:3000/user/register
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(
    chalk.bgYellow.underline(
      `the server is running on http://localhost:${PORT}`
    )
  );
});
