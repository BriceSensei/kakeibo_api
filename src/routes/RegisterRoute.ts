import express, {  Router } from 'express';
import { UserController } from '@controller/UserController';

const registerRoute: Router = express.Router()
const userController: UserController = new UserController();

registerRoute.post("/user", userController.register);


export default registerRoute
