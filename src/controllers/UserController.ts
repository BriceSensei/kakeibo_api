import { UsersInterface } from "../interfaces/Users";
import { UserService } from "../services/userService";
import { Request, Response } from "express";

export class UserController{

        async getAllUsers(req:Request, res:Response): Promise<void>{
            const allUser = new UserService();
            try {
                const users = await allUser.getAllUsers();
                res.json(users);
                
            } catch (error) {
                const errMsg ={
                    status: 500,
                    error: error,
                    message: "It this error keep please reach tech team"
                }
                res.status(500).send(errMsg)
            }
        };

       async  getUserById(req: Request, res:Response): Promise<void>{
            const IdUser = new UserService();
            IdUser.getOneUser(req,res);
            res.send("Get user ID !");
        }

        createNewUser(req: Request, res:Response){
            const createUser = new UserService();
            createUser.createNewUser(req,res);
            res.send("New user has been create !");
        }

        updateOneUser(req: Request, res:Response){
            const updateUser = new UserService();
            updateUser.updateOneUser(req, res);
            res.send("update user !");
        }

        deleteOneUser(req: Request, res:Response){
            const deleteUser = new UserService();
            deleteUser.deleteOneUser(req, res);
            res.send("Delete One user !");
        }
 
}