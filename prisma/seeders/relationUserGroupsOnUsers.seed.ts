import { Relation_UserGroupsOnUsers } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from "../prisma";

export async function seed() {
  await prisma.relation_UserGroupsOnUsers.deleteMany({});

  const relation_UserGroupsOnUsers: Relation_UserGroupsOnUsers[] = [];

  for (let i = 0; i < 8; i++) {
    relation_UserGroupsOnUsers.push({
      userGroupsId: faker.number.int({min: 1, max: 8}),
      usersId: faker.number.int({min: 15, max: 30}),
      assignedAt: new Date(),
    });
  }

  const addRelation_UserGroupsOnUsers = async () =>
    await prisma.relation_UserGroupsOnUsers.createMany({
      data: relation_UserGroupsOnUsers
    });

  addRelation_UserGroupsOnUsers();
  prisma.$disconnect()
}
