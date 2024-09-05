import prisma from "../prisma";

import { Categories } from "@prisma/client";
import { faker } from '@faker-js/faker';
import { Helper } from "@helper/helper";

export async function seed() {
  await prisma.categories.deleteMany({});

  const categories: Categories[] = [];

  const icons = (await prisma.icons.findMany()).map(icon => icon.id);

  for (let i = 0; i < 10; i++) {
    categories.push({
      id: 0,
      name: `cat_${faker.number.int()}`,
      iconId: Helper.getRandomFromArray(icons),
      color: faker.color.rgb(),
      creationDate: new Date,
      updateDate: new Date(0),
    })
    
  }

  await prisma.categories.createMany({ data: categories})
}