import prisma from "../prisma";

import { Frequencies } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Helper } from "@helper/helper";

export async function seed() {
  await prisma.frequencies.deleteMany({});

  const frequencies: Frequencies[] = [];

  const user = (await prisma.users.findMany()).map((user) => user.id);

  for (let i = 0; i < 100; i++) {
    frequencies.push({
      id: 0,
      userId: Helper.getRandomFromArray(user),
      startTime: faker.date.recent(),
      endTime: faker.date.future(),
      type: "d",
      days: "M______",
    });
  }

  await prisma.frequencies.createMany({
    data: frequencies,
  });
}
