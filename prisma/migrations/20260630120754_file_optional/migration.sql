/*
  Warnings:

  - You are about to drop the column `comment` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `comment`,
    ADD COLUMN `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `fileId` VARCHAR(191) NULL;
