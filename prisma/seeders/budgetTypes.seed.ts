import prisma from '../prisma';

import { BudgetTypes } from '@prisma/client';

export async function seed() {
  await prisma.budgetTypes.deleteMany({});

  const budgetTypes: BudgetTypes[] = [
    {
      id: 0,
      typeName: 'income',
      typeColor: '00FF00'
    },
    {
      id: 0,
      typeName: 'outcome',
      typeColor: 'FF0000'
    },
  ].map((x, i)=>{x.id = i+1; return x});

  const addBudgetTypes = async () => await prisma.budgetTypes.createMany({ data: budgetTypes });

  addBudgetTypes();
}