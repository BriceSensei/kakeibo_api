import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed(){
    const users = [
        {name: 'Coconuts', firstname:'Bernard', lastname:'Tapis', email: "bernard.tapis@gmail.com", password: "azerty", creation_date: "26-01-2024", update_date:"26-01-2024", password_update_date: "26-01-2024", last_login_date: "26-01-2024", connectionAttempts: 0, isActive: false, role: 0, curencyId: 2},
        {name: 'Nuts', firstname:'Hugo', lastname:'Boss', email: "hugo.boss@gmail.com", password: "azerty", creation_date: "26-01-2024", update_date:"26-01-2024", password_update_date: "26-01-2024", last_login_date: "26-01-2024", connectionAttempts: 0, isActive: false, role: 0, curencyId: 2}

    ]

//     for(const user of users){
//         await prisma.users.create({
//             // data: user,
//         });
//     }
// }
}
