import { Relation_UserGroupsOnUsers } from "@prisma/client";
import { faker } from "@faker-js/faker";
import prisma from "../prisma";

export async function seed() {
  await prisma.relation_UserGroupsOnUsers.deleteMany({});

  let groups = (await prisma.userGroups.findMany()).map(group => { return group.id; })

  const relation_UserGroupsOnUsers: Relation_UserGroupsOnUsers[] = []

  for (let i = 0; i < 8; i++) {

    const groupNumb = faker.number.int({min: 1, max: groups.length})-1
    
    const data = {
      userGroupsId: groups[groupNumb],
      usersId: faker.number.int({min: 15, max: 30}),
      assignedAt: new Date(),
    };

    groups.splice(groupNumb, 1)

    relation_UserGroupsOnUsers.push(data);
  }

  const addRelation_UserGroupsOnUsers = async () =>
    await prisma.relation_UserGroupsOnUsers.createMany({
      data: relation_UserGroupsOnUsers
    });

  addRelation_UserGroupsOnUsers();
  prisma.$disconnect()
}
