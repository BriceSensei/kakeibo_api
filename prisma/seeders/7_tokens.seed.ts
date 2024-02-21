import { Tokens } from "@prisma/client";
import { faker } from '@faker-js/faker';
import prisma from "../prisma";

export async function seed() {
  await prisma.tokens.deleteMany({});

  const tokens: Tokens[] = [];

  for (let i = 0; i < 30; i++) {
    tokens.push({
      id: 0,
      token: faker.string.nanoid(120),
      userAgent: faker.internet.userAgent(),
      userId: faker.number.int({min: 1, max: 30})
    })
    
  }

  const addTokens = async () => await prisma.tokens.createMany({ data: tokens.map((x, i)=>{x.id = i+1; return x})});

  addTokens();
}