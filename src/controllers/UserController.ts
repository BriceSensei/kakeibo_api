import { Users } from "@prisma/client";
import { UserService } from "../services/userService";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "@prisma/prisma";



export class UserController{

        async getAllUsers(req:Request, res:Response): Promise<void>{
            const allUser: UserService = new UserService();
            try {
                const users :Users[] = await allUser.getAllUsers();
                res.json(users);               
            } catch (error) {
                const errMsg ={
                    status: 500,
                    error: error,
                    message: "impossible de récuperer la liste des users"
                }
                res.status(500).send(errMsg);
            }
        };

        async getUserById(req: Request, res:Response): Promise<void>{
            const userMethod: UserService = new UserService();    
            const userId : number = parseInt(req.params.id);
            try {
                const users: Users = await userMethod.getOneUser(userId);
                res.json(users)
            } catch (error) {
                const errMsg = {
                    status: 500,
                    error: error,
                    message: "Fail to fetch user id"
                };                
                res.status(500).send(errMsg);             
            }                    
        };

        async createNewUser(req: Request, res:Response): Promise<void>{
            const userMethod: UserService = new UserService();
            const userData: Users = { ...req.body};         
            try {
                const user :Users = await userMethod.createNewUser(userData)
                res.json(user)
            } catch (error) {
                const errMsg = {
                    status:500,
                    error: error,
                    message: "Fail to create new user"
                }
                res.status(500).send(errMsg);
            }         
        }

        async updateOneUser(req: Request, res:Response): Promise<void>{
            const userMethod: UserService = new UserService();
            const userData: Users = req.body;
            const userId: number = parseInt(req.params.id);
            try {
                const userUpdate:Users = await userMethod.updateOneUser(userId,userData) 
                res.json(userUpdate)
            } catch (error) {
                const errMsg={
                    status: 500,
                    error:error,
                    message:"fail to update user's data"
                }
                res.status(500).send(errMsg);          
            }
        }

        async deleteOneUser(req: Request, res:Response){
            const userMethod: UserService = new UserService();
            const userId: number = parseInt(req.params.id)
            try {
                const userDelete:Users = await userMethod.deleteOneUser(userId);
                res.json(userDelete)
            } catch (error) {
               const errMsg = {
                status: 500,
                error: error,
                message:"Fail to delete user in database"
               } 
               res.status(500).send(errMsg);
            }
        }


        async HashPassword(req: Request, res: Response){

            const userMethod : UserService = new UserService();
            const userData: Users = { ...req.body}
            
            try {
                const hashPasswordUser : Users = await userMethod.hashPassword(userData)
                console.log(hashPasswordUser);
                res.status(201).send({id: hashPasswordUser.id});
                
            } catch (error) {
                const errMsg = {
                    status: 500,
                    error: error,
                    message: "Error during registration"
                }            
                res.status(500).send(errMsg);
            }
        }

 
}