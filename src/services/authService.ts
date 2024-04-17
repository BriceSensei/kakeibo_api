import { Users } from "@prisma/client";
import  jwt, { Secret }  from "jsonwebtoken";
import {config} from "dotenv";

config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

class AuthService{

    constructor(){
        
    }

     //fct pour générer un token jwt basé sur les info de l'utilisateur
     async generateAccessToken(user: Users) :Promise<string>{
          return jwt.sign({id: user.id, email: user.email}, accessTokenSecret as Secret, {expiresIn: '1800s'});
     }

}
export {AuthService};


