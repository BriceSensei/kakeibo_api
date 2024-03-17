import express, { Request, Response, Router } from 'express';
import { UnimplementedError } from '../exceptions/UnimplementedError';
import { UserController } from '@controller/UserController';

const userRoute: Router = express.Router()
const userController: UserController = new UserController();

userRoute.post("/", userController.createNewUser);
userRoute.get("/", userController.getAllUsers);
userRoute.get("/:id", userController.getUserById);
userRoute.patch("/:id", userController.updateOneUser);
userRoute.delete("/:id", userController.deleteOneUser);



export default userRoute