import prisma from '../prisma';

import { Role } from '@prisma/client';


export async function seed(){
    await prisma.role.deleteMany();

    const roles : Role[] = [
        {id: 0, name: 'admin'},
        {id: 0, name: 'moderator'},
        {id: 0, name: 'user'},
        {id: 0, name: 'invisible'},
    ];

    console.table(roles);
    const addRole = async () =>
        await prisma.role.createMany({data: roles});

    addRole()
    
}