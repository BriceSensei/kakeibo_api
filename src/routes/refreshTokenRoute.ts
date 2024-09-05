import express, { Router } from "express";
import { refreshToken } from "../middlewares/refreshToken";

const tokenRoute: Router = express.Router();

tokenRoute.post("/", refreshToken);

export default tokenRoute;
