import { Frequencies } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from "../prisma";

export async function seed() {
  await prisma.frequencies.deleteMany({});

  const frequencies: Frequencies[] = [];

  for (let i = 0; i < 100; i++) {
    frequencies.push({
      id: 0,
      userId: faker.number.int({min: 1, max: 30}),
      startTime: faker.date.recent(),
      endTime: faker.date.future(),
      type: 'd',
      days: 'M______'
    });
  }

  const addFrequencies = async () =>
    await prisma.frequencies.createMany({
      data: frequencies.map((x, i) => {
        x.id = i + 1;
        return x;
      }),
    });

  addFrequencies();
}
