import{ Request, Response, NextFunction } from 'express';
import { Users } from "@prisma/client";


// Définition d'une interface personnalisée pour l'objet de requête
interface CustomRequest extends Request{
    // Utilisation de l'interface Users pour annoter le type de la propriété 'user'
    user?: Users
}

// const roles = ["admin","moderator","user"];

export function CheckUserRole(role: number){
    return (req: CustomRequest, res:Response, next: NextFunction) => {
        if(!req.body || req.body.role !== role){
            return res.status(403).json({message: "Accès interdit"});
        }
        next();
    };
};


// async function CheckUserRole(req: Request, res:Response, next: NextFunction){
//     try {
//         const userId = await prisma?.users
//         const userWithRole = await prisma?.users.findUnique({
//             where: {id: userId},
//             include: {role: true},
//         })
//     } catch (error) {
        
//     }
//}

