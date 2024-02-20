import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

async function seed(){

    await prisma.users.create({
        data:{
            name: 'Coconuts',
            firstName:'Bernard',
            lastName:'Tapis',
            email: "bernard.tapis@gmail.com", 
            password: "azerty",
            creationDate: "26-01-2024",
            updateDate:"26-01-2024",
            passwordUpdateDate: "26-01-2024",
            lastLoginDate: "26-01-2024",
            connectionAttempts: 0,
            isActive: false,
            role: 0,
            curencyId: 2,
        },
    })

}
    seed()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async() =>{
        await prisma.$disconnect();
    })

