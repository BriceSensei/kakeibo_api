import { Users } from "@prisma/client";
import prisma from "@prisma/prisma";
import  jwt, { Secret }  from "jsonwebtoken";
import {config} from "dotenv";

config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;



class AuthService{

    constructor(){

    }

   async checkUserExist(userEmail: string) : Promise<{email: string; password: string} | null>{
    const getUserEmail = await prisma.users.findUniqueOrThrow({
        where: {email: userEmail}
    });

    return getUserEmail;
   }


   async generateAccessToken(username: string) :Promise<string>{
        return jwt.sign(username, accessTokenSecret as Secret, {expiresIn: '1800s'});
   }
   

}
export {AuthService};