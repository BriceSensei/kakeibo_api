import { UsersInterface } from "../interfaces/Users";
import { UserClass } from "../services/userService";
import { Request, Response } from "express";

export class UserController{
    
        async getAllUsers(req:Request, res:Response): Promise<void>{
            const allUser = new UserClass();

            try {
                const retour = await allUser.getAllUsers();
                res.send(retour);
                
            } catch (err) {
                const errMsg = {
                    status: 500,
                    error: err,
                    message: "It this error keep occuring please reach tech team"
                }
                res.status(500).send(errMsg)
            }
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