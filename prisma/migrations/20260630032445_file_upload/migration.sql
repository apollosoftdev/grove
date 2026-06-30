/*
  Warnings:

  - You are about to drop the column `url` on the `ImageUpload` table. All the data in the column will be lost.
  - You are about to drop the `Carts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bucket` to the `ImageUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `ImageUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `ImageUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `ImageUpload` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `Carts` DROP FOREIGN KEY `Carts_userId_fkey`;

-- AlterTable
ALTER TABLE `ImageUpload` DROP COLUMN `url`,
    ADD COLUMN `bucket` VARCHAR(191) NOT NULL,
    ADD COLUMN `fileName` VARCHAR(191) NOT NULL,
    ADD COLUMN `mimeType` VARCHAR(191) NOT NULL,
    ADD COLUMN `originalName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Carts`;

-- CreateTable
CREATE TABLE `Cart` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cart_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
