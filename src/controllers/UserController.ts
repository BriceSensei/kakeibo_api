import { UsersInterface } from "../interfaces/Users";
import { UserClass } from "../services/userService";
import { Request, Response } from "express";

export class UserController{
    
        getAllUsers(req:Request, res:Response): void{
            const allUser = new UserClass();
            allUser.getAllUsers(req, res);
            res.send("Get All users !");
        };

        getUserById(req: Request, res:Response){
            const IdUser = new UserClass();
            IdUser.getOneUser(req,res);
            res.send("Get user ID !");
        }

        createNewUser(req: Request, res:Response){
            const createUser = new UserClass();
            createUser.createNewUser(req,res);
            res.send("New user has been create !");
        }

        updateOneUser(req: Request, res:Response){
            const updateUser = new UserClass();
            updateUser.updateOneUser(req, res);
            res.send("update user !");
        }

        deleteOneUser(req: Request, res:Response){
            const deleteUser = new UserClass();
            deleteUser.deleteOneUser(req, res);
            res.send("Delete One user !");
        }
 
}