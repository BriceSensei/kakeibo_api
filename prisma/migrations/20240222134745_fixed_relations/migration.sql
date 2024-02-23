-- DropForeignKey
ALTER TABLE `Alerts` DROP FOREIGN KEY `Alerts_subCategoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `BudgetLines` DROP FOREIGN KEY `BudgetLines_frequencyId_fkey`;

-- DropForeignKey
ALTER TABLE `BudgetLines` DROP FOREIGN KEY `BudgetLines_subCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Categories` DROP FOREIGN KEY `Categories_iconId_fkey`;

-- DropForeignKey
ALTER TABLE `Epargnes` DROP FOREIGN KEY `Epargnes_subcategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Epargnes` DROP FOREIGN KEY `Epargnes_userGroupsId_fkey`;

-- DropForeignKey
ALTER TABLE `SubCategories` DROP FOREIGN KEY `SubCategories_iconId_fkey`;

-- DropForeignKey
ALTER TABLE `SubCategories` DROP FOREIGN KEY `SubCategories_userGroupsId_fkey`;

-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_curencyId_fkey`;

-- AlterTable
ALTER TABLE `Categories` MODIFY `iconId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `curencyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_curencyId_fkey` FOREIGN KEY (`curencyId`) REFERENCES `Curencies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alerts` ADD CONSTRAINT `Alerts_subCategoriesId_fkey` FOREIGN KEY (`subCategoriesId`) REFERENCES `SubCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BudgetLines` ADD CONSTRAINT `BudgetLines_frequencyId_fkey` FOREIGN KEY (`frequencyId`) REFERENCES `Frequencies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BudgetLines` ADD CONSTRAINT `BudgetLines_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Epargnes` ADD CONSTRAINT `Epargnes_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `SubCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Epargnes` ADD CONSTRAINT `Epargnes_userGroupsId_fkey` FOREIGN KEY (`userGroupsId`) REFERENCES `UserGroups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategories` ADD CONSTRAINT `SubCategories_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategories` ADD CONSTRAINT `SubCategories_userGroupsId_fkey` FOREIGN KEY (`userGroupsId`) REFERENCES `UserGroups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
