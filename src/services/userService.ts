
import {Users} from "@prisma/client";
import prisma from "@prisma/prisma";
//import * as crypto from "crypto";
import bcrypt from "bcrypt";


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

    async hashPassword(userData: Users) : Promise<Users>{

        //génère un sel aléatoire
        const salt = await bcrypt.genSaltSync(10);
        //crée un hachage du mdp en utilisant SHA-512 et le sel
        const hash = await bcrypt.hash(userData.password, salt);

        const hashedPassword = `${salt}$${hash}`;
    
        const newUser : Users = await prisma?.users.create({
            data: {
                name: userData.name,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: hashedPassword,
                creationDate: new Date(),
                updateDate: new Date(),
                passwordUpdateDate: new Date(),
                lastLoginDate: new Date(),
                connectionAttempts: 0,
                isActive: false,
                role: 0,
                curencyId: userData.curencyId,                
            }
        });

        return newUser;
    }

    

}
export{UserService};