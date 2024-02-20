import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed(){
    await prisma.tips.create({
        data: {
        title: "Conseil du Jour",       
        description: "Economiser en souscrivant un abonement",  
        level : 1,      
        creationDate: "29-01-2024",
        updateDate :"29-01-2024",
        },

    });

}
    seed()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async()=>{
        await prisma.$disconnect;
    })