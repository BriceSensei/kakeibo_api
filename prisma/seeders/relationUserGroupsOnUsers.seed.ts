import prisma from '../prisma';

import { Relation_UserGroupsOnUsers } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Helper } from '@helper/helper';

export async function seed() {
  await prisma.relation_UserGroupsOnUsers.deleteMany({});

  let groups = (await prisma.userGroups.findMany()).map(group => { return group.id; })

  const relation_UserGroupsOnUsers: Relation_UserGroupsOnUsers[] = [];

  const user = (await prisma.users.findMany()).map(user => user.id);
  

  for (let i = 0; i < 8; i++) {

    const groupNumb = faker.number.int({min: 1, max: groups.length})-1
    
    const data = {
      userGroupsId: groups[groupNumb],
      usersId: Helper.getRandomFromArray(user),
      assignedAt: new Date(),
    };

    groups.splice(groupNumb, 1)

    relation_UserGroupsOnUsers.push(data);
  }

    await prisma.relation_UserGroupsOnUsers.createMany({
      data: relation_UserGroupsOnUsers
    });

  prisma.$disconnect()
}
