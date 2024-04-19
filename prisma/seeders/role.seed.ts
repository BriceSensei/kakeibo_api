import { Role } from "@prisma/client";
import { faker } from '@faker-js/faker';
import prisma from "../prisma";


export async function seed(){
    await prisma.role.deleteMany();

    const roles : Role[] = [
        {id: 0, name: "admin"},
        {id: 0, name: "moderator"},
        {id: 0, name: "user"},
        {id: 0, name: "invisible"},
    ];

    console.table(roles);
    const addRole = async () =>
        await prisma.role.createMany({data: roles});

    addRole()
    
}