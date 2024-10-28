import prisma from '../prisma';

import { Tips } from '@prisma/client';
import { faker } from '@faker-js/faker';

export async function seed() {
  await prisma.tips.deleteMany({});

  const tips: Tips[] = [];

  for (let i = 0; i < 30; i++) {
    tips.push({
      id: 0,
      title: faker.lorem.words({min: 3, max: 5}), 
      description: faker.lorem.sentence(), 
      level: faker.number.int({min: 1, max: 100}),
      creationDate: new Date(),
      updateDate: new Date(0)
    })
    
  }

  const addTips = async () => await prisma.tips.createMany({ data: tips.map((x, i)=>{x.id = i+1; return x})});

  addTips();
}