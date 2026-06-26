-- CreateTable
CREATE TABLE `FavouriteProducts` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `property` VARCHAR(191) NOT NULL,
    `utility` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `rating` INTEGER NULL,
    `comment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `imageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FavouriteProducts` ADD CONSTRAINT `FavouriteProducts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavouriteProducts` ADD CONSTRAINT `FavouriteProducts_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `ImageUpload`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
