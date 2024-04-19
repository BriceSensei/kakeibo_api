import { Epargnes } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from "../prisma";
import { Helper } from "../../src/helper";

export async function seed() {
  await prisma.epargnes.deleteMany({});

  const epargnes: Epargnes[] = [];

  const user = (await prisma.users.findMany()).map(user => user.id);
  const category = (await prisma.categories.findMany()).map(category => category.id);

  for (let i = 0; i < 100; i++) {
    epargnes.push({
      id:0,
      userId:Helper.getRandomFromArray(user),
      value: faker.number.float({min: 1, max: 50000, fractionDigits: 2}),
      title: faker.lorem.sentence(3),
      description:faker.lorem.sentence(faker.number.int({min: 3, max: 10})),
      creationDate: faker.date.recent(),
      updateDate:new Date(0),
      beginDate:faker.date.recent(),
      endDate:faker.date.future(),
      categoryId:Helper.getRandomFromArray(category),
      subcategoryId:null,
      userGroupsId:null,
    });
  }

    await prisma.epargnes.createMany({data: epargnes});
  
  prisma.$disconnect()
}
