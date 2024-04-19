import { Users } from "@prisma/client";
import  jwt, { Secret }  from "jsonwebtoken";
import {config} from "dotenv";

config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

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
     async generateAccessToken(user: Users) :Promise<string>{
          return jwt.sign({id: user.id, email: user.email}, accessTokenSecret as Secret, {expiresIn: '1800s'});
     }

}



