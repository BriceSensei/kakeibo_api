import prisma from "../prisma";

import { SubCategories } from "@prisma/client";
import { faker } from '@faker-js/faker';
import { Helper } from "@helper/helper";

export async function seed(){
    await prisma.subCategories.deleteMany({});

    const subcategories: SubCategories[] = [];

    const icons = (await prisma.icons.findMany()).map(icon => icon.id);
    const user = (await prisma.users.findMany()).map(user => user.id);
    const parentId = (await prisma.categories.findMany()).map(categorie => categorie.id);

    for(let i = 0; i < 10; i++){
        subcategories.push({
            id: 0,
            name: `subCat_${faker.number.int()}`,
            iconId: Helper.getRandomFromArray(icons),
            color: faker.color.rgb(),
            creationDate: new Date,
            updateDate: new Date(0),
            parentId: Helper.getRandomFromArray(parentId),
            userId:  Helper.getRandomFromArray(user),
            userGroupsId: null
        })
    }

    await prisma.subCategories.createMany({data: subcategories});

}
