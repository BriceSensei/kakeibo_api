import { Users } from "@prisma/client";
import { faker } from '@faker-js/faker';
import prisma from "../prisma";

export async function seed() {
  await prisma.users.deleteMany({});

  const users: Users[] = [];

  for (let i = 0; i < 30; i++) {
    
    const name = faker.internet.userName();

    users.push({
      id: 0,
      name: name,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `${name}.kakeibo@pandacrp.com`,
      password: faker.internet.password(),
      creationDate: faker.date.recent(),
      updateDate: new Date(0),
      passwordUpdateDate: new Date(0),
      lastLoginDate: faker.date.recent(),
      connectionAttempts: faker.number.int({min: 0, max: 2}),
      isActive: true,
      role: 0,
      curencyId: faker.number.int({min: 1, max: 109}),
    })
    
  }

  const addUsers = async () => await prisma.users.createMany({ data: users.map((x, i)=>{x.id = i+1; return x})});

  addUsers();
}