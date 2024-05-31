
import prisma from "@prisma/prisma";

import  jwt, { Secret }  from "jsonwebtoken";
import {config} from "dotenv";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "@services/authService";

config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
//const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

 export const refreshAccessToken = async(req:Request, res:Response, next: NextFunction)=>{

     // const authService: AuthService = new AuthService();
     // const authHeader = req.headers['authorization'];
     // const token = authHeader && authHeader.split(" ")[1];

     // if(!token){
     //      res.status(401).json({message: "no token"});
     //      return
     // }

     // try{
     //      const decoded: any = jwt.verify(token, accessTokenSecret as Secret);
     //      const user = await prisma.users.findUnique({where:{id:decoded.id}});

     //      if(!user){
     //           return res.status(401).json({message:"no user"});
     //      }
     //      //genere un nouveau token
     //      const newAccessToken = await authService.generateAccessToken(user,req);
     //      console.log("CREATION D'UN NOUVEAU TOKEN" + " " + newAccessToken)
     //      //ajout du nouveau token dans le header de la reponse
     //      res.setHeader('Authorization', `Bearer ${newAccessToken}`);
     //      res.locals.newAccessToken = newAccessToken;
     //      next();
     // }catch(error){
     //      return res.sendStatus(403).json({
     //           error: true,
     //           message: "Authentification error",
     //      });
     // }
}   