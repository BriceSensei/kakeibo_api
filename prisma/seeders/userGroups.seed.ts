import { UserGroups } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from "../prisma";
import { Helper } from "../../src/helper";

export async function seed() {
  await prisma.userGroups.deleteMany({});

  const userGroups: UserGroups[] = [];

  const owner = (await prisma.users.findMany()).map(owner => owner.id);

  for (let i = 0; i < 8; i++) {
    userGroups.push({
      id: 0,
      title: faker.lorem.sentence({min: 1, max: 3}),
      ownerId: Helper.getRandomFromArray(owner)
    });
  }
  
    await prisma.userGroups.createMany({data: userGroups});

  prisma.$disconnect()
}
