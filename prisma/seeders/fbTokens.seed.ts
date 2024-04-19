import { Tokens } from "@prisma/client";
import { faker } from '@faker-js/faker';
import prisma from "../prisma";
import { Helper } from "@helper/helper";

export async function seed() {
  await prisma.tokens.deleteMany({});

  const tokens: Tokens[] = [];

  const user = (await prisma.users.findMany()).map(user => user.id);

  for (let i = 0; i < 30; i++) {
    
    const name = faker.internet.userName();

    tokens.push({
      id: 0,
      token: faker.string.nanoid(120),
      userAgent: faker.internet.userAgent(),
      userId: Helper.getRandomFromArray(user)
    })
    
  }

  await prisma.tokens.createMany({ data: tokens});

  prisma.$disconnect()
}