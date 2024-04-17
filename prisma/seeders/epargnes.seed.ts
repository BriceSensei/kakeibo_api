import { Epargnes } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from "../prisma";

export async function seed() {
  await prisma.epargnes.deleteMany({});

  const epargnes: Epargnes[] = [];

  for (let i = 0; i < 100; i++) {
    epargnes.push({
      id:0,
      userId:faker.number.int({min: 1, max: 30}),
      value: faker.number.float({min: 1, max: 50000, fractionDigits: 2}),
      title: faker.lorem.sentence(3),
      description:faker.lorem.sentence(faker.number.int({min: 3, max: 10})),
      creationDate: faker.date.recent(),
      updateDate:new Date(0),
      beginDate:faker.date.recent(),
      endDate:faker.date.future(),
      categoryId:faker.number.int({min: 1, max: 10}),
      subcategoryId:null,
      userGroupsId:null,
    });
  }

  const addEpargnes = async () =>
    await prisma.epargnes.createMany({
      data: epargnes.map((x, i) => {
        x.id = i + 1;
        return x;
      }),
    });

  addEpargnes();
  prisma.$disconnect()
}
