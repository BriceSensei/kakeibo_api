import { Alerts } from "@prisma/client";
import { faker } from '@faker-js/faker';
import prisma from "../prisma";

export async function seed() {
  await prisma.alerts.deleteMany({});

  const alerts: Alerts[] = [];

  for (let i = 0; i < 30; i++) {
    alerts.push({
      id: 0,
      title: faker.lorem.sentence(5),
      seuil: faker.number.float({min: 10, max: 100, fractionDigits: 2}),
      description: faker.lorem.sentence(),
      type: ["PCT","VAL"][faker.number.int({min: 0, max: 1})],
      userId: faker.number.int({min: 1, max: 30}),
      categoryId: faker.number.int({min:1, max: 10}),
      subCategoriesId: null,
      budgetId: 0
    })
    
  }

  const addAlerts = async () => await prisma.alerts.createMany({ data: alerts.map((x, i)=>{x.id = i+1; return x})});

  addAlerts();
  prisma.$disconnect()
}