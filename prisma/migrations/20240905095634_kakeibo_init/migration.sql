-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `creation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_date` DATETIME(3) NOT NULL,
    `password_update_date` DATETIME(3) NOT NULL,
    `last_login_date` DATETIME(3) NOT NULL,
    `connectionAttempts` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `roleId` INTEGER NULL DEFAULT 0,
    `curencyId` INTEGER NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConfirmationCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curencies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `devise` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FbTokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `userAgent` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `FbTokens_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Icons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iconName` VARCHAR(191) NOT NULL,
    `svgPath` TEXT NOT NULL,

    UNIQUE INDEX `Icons_iconName_key`(`iconName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `iconId` INTEGER NULL,
    `color` VARCHAR(191) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alerts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `seuil` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `subCategoriesId` INTEGER NULL,
    `budgetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BudgetLines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `frequencyId` INTEGER NULL,
    `categoryId` INTEGER NOT NULL,
    `subCategoryId` INTEGER NULL,
    `updateDate` DATETIME(3) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BudgetTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeName` VARCHAR(191) NOT NULL,
    `typeColor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `BudgetTypes_typeName_key`(`typeName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Epargnes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,
    `beginDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `subcategoryId` INTEGER NULL,
    `userGroupsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Frequencies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endTime` DATETIME(3) NULL,
    `type` VARCHAR(191) NOT NULL,
    `days` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `iconId` INTEGER NULL,
    `color` VARCHAR(191) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,
    `parentId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `userGroupsId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tips` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserGroups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `ownerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relation_UserGroupsOnCategories` (
    `userGroupsId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userGroupsId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relation_UserGroupsOnSubCategories` (
    `userGroupsId` INTEGER NOT NULL,
    `subCategoriesId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userGroupsId`, `subCategoriesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relation_UserGroupsOnEpargnes` (
    `userGroupsId` INTEGER NOT NULL,
    `epargnesId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userGroupsId`, `epargnesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relation_UserGroupsOnUsers` (
    `userGroupsId` INTEGER NOT NULL,
    `usersId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userGroupsId`, `usersId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_curencyId_fkey` FOREIGN KEY (`curencyId`) REFERENCES `Curencies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `ConfirmationCode` ADD CONSTRAINT `ConfirmationCode_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FbTokens` ADD CONSTRAINT `FbTokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alerts` ADD CONSTRAINT `Alerts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alerts` ADD CONSTRAINT `Alerts_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alerts` ADD CONSTRAINT `Alerts_subCategoriesId_fkey` FOREIGN KEY (`subCategoriesId`) REFERENCES `SubCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BudgetLines` ADD CONSTRAINT `BudgetLines_frequencyId_fkey` FOREIGN KEY (`frequencyId`) REFERENCES `Frequencies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BudgetLines` ADD CONSTRAINT `BudgetLines_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BudgetLines` ADD CONSTRAINT `BudgetLines_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Epargnes` ADD CONSTRAINT `Epargnes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Epargnes` ADD CONSTRAINT `Epargnes_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Epargnes` ADD CONSTRAINT `Epargnes_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `SubCategories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Epargnes` ADD CONSTRAINT `Epargnes_userGroupsId_fkey` FOREIGN KEY (`userGroupsId`) REFERENCES `UserGroups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Frequencies` ADD CONSTRAINT `Frequencies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategories` ADD CONSTRAINT `SubCategories_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategories` ADD CONSTRAINT `SubCategories_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Icons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategories` ADD CONSTRAINT `SubCategories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategories` ADD CONSTRAINT `SubCategories_userGroupsId_fkey` FOREIGN KEY (`userGroupsId`) REFERENCES `UserGroups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserGroups` ADD CONSTRAINT `UserGroups_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_UserGroupsOnCategories` ADD CONSTRAINT `Relation_UserGroupsOnCategories_userGroupsId_fkey` FOREIGN KEY (`userGroupsId`) REFERENCES `UserGroups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_UserGroupsOnCategories` ADD CONSTRAINT `Relation_UserGroupsOnCategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_UserGroupsOnSubCategories` ADD CONSTRAINT `Relation_UserGroupsOnSubCategories_userGroupsId_fkey` FOREIGN KEY (`userGroupsId`) REFERENCES `UserGroups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_UserGroupsOnSubCategories` ADD CONSTRAINT `Relation_UserGroupsOnSubCategories_subCategoriesId_fkey` FOREIGN KEY (`subCategoriesId`) REFERENCES `SubCategories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_UserGroupsOnEpargnes` ADD CONSTRAINT `Relation_UserGroupsOnEpargnes_userGroupsId_fkey` FOREIGN KEY (`userGroupsId`) REFERENCES `UserGroups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_UserGroupsOnEpargnes` ADD CONSTRAINT `Relation_UserGroupsOnEpargnes_epargnesId_fkey` FOREIGN KEY (`epargnesId`) REFERENCES `Epargnes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_UserGroupsOnUsers` ADD CONSTRAINT `Relation_UserGroupsOnUsers_userGroupsId_fkey` FOREIGN KEY (`userGroupsId`) REFERENCES `UserGroups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relation_UserGroupsOnUsers` ADD CONSTRAINT `Relation_UserGroupsOnUsers_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
