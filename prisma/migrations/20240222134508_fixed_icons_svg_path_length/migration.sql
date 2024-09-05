/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `UserGroups` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `UserGroups` DROP FOREIGN KEY `UserGroups_ownerId_fkey`;

-- CreateIndex
-- CREATE UNIQUE INDEX `UserGroups_ownerId_key` ON `UserGroups_ownerId_key`(`ownerId`);

-- The previous line has been removed because she was causing problems
-- if a user was the owner of multiple groups

-- AddForeignKey
ALTER TABLE `UserGroups` ADD CONSTRAINT `UserGroups_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
