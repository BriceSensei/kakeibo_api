
import prisma from "@prisma/prisma";

//import { RefreshToken } from "@prisma/client";

import { Users } from "@prisma/client";
import  jwt, { Secret }  from "jsonwebtoken";
import {config} from "dotenv";
import { Request } from "express";

config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export class AuthService{

    constructor(){
        
    }
   
     /**
      * Generate one jwt token with user's informations and sign the token with secret key and Expiry date
      * 
      * @param user type Users
      *
      * @returns Promise<string>
      */
     // async generateAccessToken(user: Users) :Promise<string>{
     //      return jwt.sign({id: user.id, email: user.email}, accessTokenSecret as Secret, {expiresIn: '1h'});
          
     // }

     async generateAccessToken(user: Users, req:Request, stayLoggedIn: boolean):Promise<string>{
          const expiresIn = stayLoggedIn ? '7d' : '1h';
          const userAgent = req.headers['user-agent']||'Unknown';
          const payload = {
               id: user.id,
               email: user.email,
               userAgent: userAgent,
          };

          const token = jwt.sign(payload, accessTokenSecret as Secret, {expiresIn: expiresIn});

          return token;
     }

     async generateRefreshToken(user: Users, userAgent:string) : Promise<string>{
          const token = jwt.sign({id: user.id}, refreshTokenSecret as Secret, {expiresIn: '7d'});
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 7);
          await prisma.refreshToken.create({
               data: {
                    token,
                    userAgent,
                    user:{
                         connect:{
                              id: user.id
                         }
                    },            
                    expiresAt,
               },
          });
          return token
     }

     async verifyRefreshToken(token: string, userAgent: string): Promise<Users | null> {
          const refreshToken = await prisma.refreshToken.findUnique({
               where: {token},
               include: {user: true},
          });

          if(!refreshToken || refreshToken.userAgent !== userAgent){
               return null;
          }
          return refreshToken.user;
     }   
}



