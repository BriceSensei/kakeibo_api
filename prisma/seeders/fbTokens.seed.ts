import prisma from "../prisma";

import { faker } from "@faker-js/faker";
import { Helper } from "@helper/helper";
import { FbTokens } from "@prisma/client";

export async function seed() {
  await prisma.fbTokens.deleteMany({});

  const tokens: FbTokens[] = [];

  const user = (await prisma.users.findMany()).map((user) => user.id);

  for (let i = 0; i < 30; i++) {
    const name = faker.internet.userName();

    tokens.push({
      id: 0,
      token: faker.string.nanoid(120),
      userAgent: faker.internet.userAgent(),
      userId: Helper.getRandomFromArray(user),
    });
  }

  await prisma.fbTokens.createMany({ data: tokens });

  prisma.$disconnect();
}
