/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `LecturerInformation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `LecturerInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lecturerinformation` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `LecturerInformation_userId_key` ON `LecturerInformation`(`userId`);

-- AddForeignKey
ALTER TABLE `LecturerInformation` ADD CONSTRAINT `LecturerInformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
