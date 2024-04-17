import{ Request, Response, NextFunction } from 'express';
import  jwt  from "jsonwebtoken";
import {config} from "dotenv";

config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;


async function authentificateToken(req:Request, res:Response, next:NextFunction){
    const authHeader = req.headers['authorization'];
    //extraction du token jwt depuis l'en-tête Authorization
    const token = authHeader && authHeader.split('')[1];
    //Si aucun token n'est fourni, renvoyer une réponse 401 Unauthorized
    if(token == null){
        return res.sendStatus(401);
    }

    try {
        //vérification et decodage du token jwt
        const decoded:any = jwt.verify(token, accessTokenSecret as string);
        const user = await prisma?.users.findUnique({where: {id: decoded.userId}})
        if(!user){
            return res.sendStatus(401);
        }
        //appel au middlewaresuivant
        next();
    } catch (error) {
        return res.sendStatus(403).json({
            error: true,
            message: "Authentification error",
        });
    }
}
export{authentificateToken};

