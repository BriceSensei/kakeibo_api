import { Users } from "@prisma/client";
import prisma from "@prisma/prisma";


class AuthService{

    constructor(){

    }

   async getOneEmail(email: string) : Promise<Users> {

        const userEmail :Users = await prisma.users.findUniqueOrThrow({
            where: {email: email},
        });

        return userEmail;
   }

}
export {AuthService};