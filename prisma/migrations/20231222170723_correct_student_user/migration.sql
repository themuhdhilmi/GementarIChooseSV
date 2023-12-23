/*
  Warnings:

  - You are about to drop the column `studentInformationId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `StudentInformation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `StudentInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_studentInformationId_fkey`;

-- AlterTable
ALTER TABLE `studentinformation` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `studentInformationId`;

-- CreateIndex
CREATE UNIQUE INDEX `StudentInformation_userId_key` ON `StudentInformation`(`userId`);

-- AddForeignKey
ALTER TABLE `StudentInformation` ADD CONSTRAINT `StudentInformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
