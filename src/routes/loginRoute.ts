import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
import { AuthController } from "@controller/AuthController";

const loginRoute : Router = express.Router();
const authController : AuthController = new AuthController;

loginRoute.post("/", authController.login)


export default loginRoute;