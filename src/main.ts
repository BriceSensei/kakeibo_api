import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const ENV: NodeJS.ProcessEnv = process.env;

const app = express();

/** Make routes here */

const port = parseInt(ENV.PORT ?? "3000");

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

console.log("Test");