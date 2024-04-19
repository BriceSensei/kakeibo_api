import prisma from "../prisma";

import { BudgetLines } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Helper } from "@helper/helper";


export async function seed() {
  await prisma.budgetLines.deleteMany({});

  const budgetLines: BudgetLines[] = [];

  const user = (await prisma.users.findMany()).map(user => user.id);
  const category = (await prisma.categories.findMany()).map(category => category.id);
  

  for (let i = 0; i < 100; i++) {
    budgetLines.push({
      id: 0,
      userId: Helper.getRandomFromArray(user),
      value: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
      title: faker.lorem.sentence({ min: 1, max: 5 }),
      description: faker.lorem.sentence({ min: 1, max: 10 }),
      date: faker.date.recent(),
      type: faker.number.int({ min: 0, max: 1 })==1?'income':'outcome',
      frequencyId: null,
      categoryId: Helper.getRandomFromArray(category),
      subCategoryId: null,
      updateDate: new Date(0),
      creationDate: faker.date.recent(),
    });
  }

  const addBudgetLines = async () =>
    await prisma.budgetLines.createMany({
      data: budgetLines.map((x, i) => {
        x.id = i + 1;
        return x;
      }),
    });

  addBudgetLines();
  prisma.$disconnect()
}
