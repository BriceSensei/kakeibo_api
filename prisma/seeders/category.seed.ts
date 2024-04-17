import { Categories } from "@prisma/client";
import { faker } from '@faker-js/faker';
import prisma from "../prisma";

export async function seed() {
  await prisma.categories.deleteMany({});

  const categories: Categories[] = [];

  for (let i = 0; i < 10; i++) {
    categories.push({
      id: 0,
      name: `cat_${faker.number.int()}`,
      iconId: faker.number.int({min:1, max: 15}),
      color: faker.color.rgb(),
      creationDate: new Date,
      updateDate: new Date(0),
    })
    
  }

  const addCategories = async () => await prisma.categories.createMany({ data: categories.map((x, i)=>{x.id = i+1; return x})});

  addCategories();
}