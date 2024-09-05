import prisma from "../prisma";

import { Alerts } from "@prisma/client";
import { faker } from '@faker-js/faker';
import { Helper } from "@helper/helper";

export async function seed() {
  await prisma.alerts.deleteMany({});

  const alerts: Alerts[] = [];

  const user = (await prisma.users.findMany()).map(user => user.id);
  const category = (await prisma.categories.findMany()).map(category => category.id);
  // const subcategories= (await prisma.subCategories.findMany()).map(subcategories => subcategories.id);
  // const budget =(await prisma.budgetLines.findMany()).map(budget => budget.id);

  for (let i = 0; i < 30; i++) {
    alerts.push({
      id: 0,
      title: faker.lorem.sentence(5),
      seuil: faker.number.float({min: 10, max: 100, fractionDigits: 2}),
      description: faker.lorem.sentence(),
      type: ["PCT","VAL"][faker.number.int({min: 0, max: 1})],
      userId: Helper.getRandomFromArray(user),
      categoryId: Helper.getRandomFromArray(category),
      subCategoriesId: null,
      budgetId: 0
    })
    
  }

  const addAlerts = async () => await prisma.alerts.createMany({ data: alerts.map((x, i)=>{x.id = i+1; return x})});

  addAlerts();
  prisma.$disconnect()
}