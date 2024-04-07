import { Users } from "@prisma/client";
import prisma from "@prisma/prisma";
import  jwt, { Secret }  from "jsonwebtoken";
import {config} from "dotenv";

config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;



class AuthService{

    constructor(){
        
    }

     // async checkUserExist(userEmail: string) : Promise<{email: string; password: string} | null>{
     //      const getUserEmail = await prisma.users.findUniqueOrThrow({
     //           where: {email: userEmail}
     //      });
     //      return getUserEmail;
     // }

     //fct pour générer un token jwt basé sur les info de l'utilisateur
     async generateAccessToken(user: Users) :Promise<string>{
          return jwt.sign({id: user.id, email: user.email}, accessTokenSecret as Secret, {expiresIn: '1800s'});
     }

     

   
}
export {AuthService};


