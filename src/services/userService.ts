import { Request, Response } from "express";
import { UsersInterface } from "../interfaces/Users";
import { UnimplementedError} from "../exceptions/UnimplementedError";
import { PrismaClient, Users} from "@prisma/client";
import prisma from "@prisma/prisma";



class UserService{

    constructor(){}


   async getAllUsers() : Promise<Users[]> {

        const allUsers: Users[] = await prisma.users.findMany();
        return allUsers;               
           
    };

     async getOneUser(userId: number) : Promise<Users>{
        
        const user: Users = await prisma.users.findUniqueOrThrow({
            where: {id: userId},
            })          
        return user; 
    }

   async createNewUser(userData: Users) : Promise<Users>{
        const user: Users =  await prisma.users.create({data: userData})     
        return user
    }

   async updateOneUser(userId: number, userData:Users) : Promise<Users>{
        const user: Users = await prisma.users.update({
            where:{id: userId},
            data: userData
        })
        return user
    }

   async deleteOneUser(userId: number) : Promise<Users >{
        const user : Users = await prisma.users.delete({where:{id:userId}})
        return user
    }

}
export{UserService};