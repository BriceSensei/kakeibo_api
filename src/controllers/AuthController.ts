import { Users } from "@prisma/client";
import { AuthService } from "../services/authService";
import { Request, Response } from "express";
import prisma from "@prisma/prisma";
import bcrypt from "bcrypt";
import validator from "validator";


export class AuthController{

    async login(req: Request, res:Response) : Promise<void>{

        const authMethod : AuthService = new AuthService;
        const {email, password} = req.body;

        const token = authMethod.generateAccessToken(email)
        //res.json(token);
        console.log(email, password);
        console.log(token);
        try{
                        
            //Validation de l'email
            if(!validator.isEmail(email)){
                res.status(400).json({message: "incorrect email"});
                return;
            }
            //validation user
            const user = await authMethod.checkUserExist(email)
            if(!user){
                res.status(404).json({message: "User not found"});
                return;
            }
            //validation mdp
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword){
                res.status(401).json({message: "incorrect password"});
                return;
            }

        }catch(error){
            const errMsg = {
                status: 500,
                error: error,
                message: "Database connection failed."
            }

            res.status(500).send(errMsg);
        }
    };


    


}


