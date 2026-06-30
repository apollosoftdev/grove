/*
  Warnings:

  - You are about to drop the `FileProxy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FileUpload` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FileProxy` DROP FOREIGN KEY `FileProxy_productId_fkey`;

-- DropForeignKey
ALTER TABLE `FileProxy` DROP FOREIGN KEY `FileProxy_userId_fkey`;

-- DropForeignKey
ALTER TABLE `FileUpload` DROP FOREIGN KEY `FileUpload_fileproxyId_fkey`;

-- DropTable
DROP TABLE `FileProxy`;

-- DropTable
DROP TABLE `FileUpload`;

-- CreateTable
CREATE TABLE `FileToProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `File` (
    `id` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(191) NOT NULL,
    `bucket` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `filetoproductId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FileToProduct` ADD CONSTRAINT `FileToProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_filetoproductId_fkey` FOREIGN KEY (`filetoproductId`) REFERENCES `FileToProduct`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
