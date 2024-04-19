import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function main() {
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Alerts")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Tokens")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS BudgetLines")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Frequencies")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Tips")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Relation_UserGroupsOnCategories")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Relation_UserGroupsOnEpargnes")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS FbTokens")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS BudgetTypes")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Relation_UserGroupsOnSubCategories")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Epargnes")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Relation_UserGroupsOnUsers")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS SubCategories")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Categories")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Icons")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS UserGroups")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Users")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Curencies")
    await prisma.$executeRawUnsafe("DROP TABLE IF EXISTS Role")
    await prisma.$disconnect();
}
main();
