import { UserGroups } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from "../prisma";

export async function seed() {
  await prisma.userGroups.deleteMany({});

  const userGroups: UserGroups[] = [];

  for (let i = 0; i < 8; i++) {
    userGroups.push({
      id: 0,
      title: faker.lorem.sentence({min: 1, max: 3}),
      ownerId: faker.number.int({min: 1, max: 14})
    });
  }

  const addUserGroups = async () =>
    await prisma.userGroups.createMany({
      data: userGroups.map((x, i) => {
        x.id = i + 1;
        return x;
      }),
    });

  addUserGroups();
  prisma.$disconnect()
}
