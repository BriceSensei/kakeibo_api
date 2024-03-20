import { Users } from "@prisma/client";
import { AuthService } from "../services/authService";
import { Request, Response } from "express";
import prisma from "@prisma/prisma";
import bcrypt from "bcrypt";
import validator from "validator";


export class AuthController{

    async login(req: Request, res:Response) : Promise<void>{

        const userEmail : AuthService = new AuthService;

        try{
            const {email, password} = req.body;
            
            
            //Validation de l'email
            if(!validator.isEmail(email)){
                res.status(400).json({message: "incorrect email"});
                return;
            }
            const user: Users = await userEmail.getOneEmail(email)
            
            if(!user){
                res.status(404).json({message: "User not found"});
                return;
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            
            if(!isValidPassword){
                res.status(401).json({message: "incorrect password"});
                return;
            }

            //authentification reussie
            res.status(200).json({message: "Authentication successful."})

        }catch(error){
            const errMsg = {
                status: 500,
                error: error,
                message: "Internal server error."
            }

            res.status(500).send(errMsg);
        }
    };

}