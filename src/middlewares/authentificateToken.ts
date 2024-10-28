
import{ Request, Response, NextFunction } from 'express';
import { PrismaClient, Users } from '@prisma/client';

import  jwt  from 'jsonwebtoken';
import {config} from 'dotenv';

config()
const prisma = new PrismaClient();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

interface CustomRequest extends Request{
    // Utilisation de l'interface Users pour annoter le type de la propriété 'user'
    user?: Users
}

export async function authentificateToken(req:CustomRequest, res:Response, next:NextFunction){

    const authHeader = req.headers['authorization'];
    //extraction du token jwt depuis l'en-tête Authorization
    const token = authHeader && authHeader.split(' ')[1];
    //Si aucun token n'est fourni, renvoyer une réponse 401 Unauthorized
    if(token == null){
        return res.status(401).json({message: 'Access token is missing'});
    }
    try {
        //vérification et decodage du token jwt
        const decoded:any = jwt.verify(token, accessTokenSecret as string);
        const user = await prisma?.users.findUnique({where: {id: decoded.id}})
        if(!user){
            console.log('invalid token')
            return res.status(401).json({message: 'Invalid token'});
        }
        //ajouter les informations de l'utilisateur à la requête
        req.user = user;
        //appel au middlewaresuivant
        next();
    } catch (error) {
        console.error(error)
        return res.status(403).json({
            error: true,
            message: 'Authentification error',
        });
    }
};


