-- DropForeignKey
ALTER TABLE `Carts` DROP FOREIGN KEY `Carts_userId_fkey`;

-- DropIndex
DROP INDEX `Carts_userId_key` ON `Carts`;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
