import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { ParkingRouter } from "./routers";

dotenv.config();
const ENV: NodeJS.ProcessEnv = process.env;
const app = express();
const port = parseInt(ENV.PORT ?? "3000");

/**MIDDLEWARE */
app.use(function (req: Request, res: Response, next: NextFunction) {
  console.log("Heure", Date.now());
  next();
});

app.use("/parking", ParkingRouter);
/** Make routes here */

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});


