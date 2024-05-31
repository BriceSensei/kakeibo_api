import express, { Router } from "express";
import { UserController } from "@controller/UserController";
import { authentificateToken } from "../middlewares/authentificateToken";
import { CheckUserRole } from "../middlewares/CheckUserRole";

const userRoute: Router = express.Router();
const userController: UserController = new UserController();

userRoute.use(authentificateToken);
userRoute.get("/", CheckUserRole(13), userController.getAllUsers);
userRoute.get("/:id", userController.getUserById);

userRoute.post("/", userController.createNewUser);
userRoute.patch("/:id", userController.updateOneUser);
userRoute.delete("/:id", userController.deleteOneUser);

export default userRoute;
