/*
  Warnings:

  - You are about to drop the `refreshtoken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tokens` DROP FOREIGN KEY `Tokens_userId_fkey`;

-- DropTable
DROP TABLE `refreshtoken`;

-- DropTable
DROP TABLE `tokens`;
