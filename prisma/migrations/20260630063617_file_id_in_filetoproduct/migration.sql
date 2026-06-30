/*
  Warnings:

  - You are about to drop the column `filetoproductId` on the `File` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `FileToProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `File` DROP FOREIGN KEY `File_filetoproductId_fkey`;

-- DropIndex
DROP INDEX `File_filetoproductId_fkey` ON `File`;

-- AlterTable
ALTER TABLE `File` DROP COLUMN `filetoproductId`;

-- AlterTable
ALTER TABLE `FileToProduct` ADD COLUMN `fileId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `fileId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FileToProduct` ADD CONSTRAINT `FileToProduct_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
