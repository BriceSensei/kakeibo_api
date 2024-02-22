import { Request, Response } from "express";
import { UsersInterface } from "../interfaces/Users";
import { UnimplementedError} from "../exceptions/UnimplementedError";
import { PrismaClient, Users} from "@prisma/client";

const userClient = new PrismaClient().users

class UserService{

    constructor(){}


   async getAllUsers() : Promise<Users[]>  {
        try {
            const allUsers: Users[] = await userClient.findMany();
            return allUsers;               
        } catch (error) {       
            console.error("Erreur lors de la récupération des utilisateurs :", error);
            return error;
        }      
    };

    getOneUser = (req: Request, res: Response) : UsersInterface | undefined =>{
        return 
    }

    createNewUser = (req: Request, res: Response) : void => {
        throw new UnimplementedError();
    }

    updateOneUser = (req: Request, res: Response) : void => {
        throw new UnimplementedError();
    }

    deleteOneUser = (req: Request, res: Response) : void => {
        throw new UnimplementedError();
    }
}

export{UserService};