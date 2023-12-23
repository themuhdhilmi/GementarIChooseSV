/*
  Warnings:

  - Made the column `sessionYearId` on table `studentinformation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `studentinformation` DROP FOREIGN KEY `StudentInformation_sessionYearId_fkey`;

-- AlterTable
ALTER TABLE `studentinformation` MODIFY `sessionYearId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `StudentInformation` ADD CONSTRAINT `StudentInformation_sessionYearId_fkey` FOREIGN KEY (`sessionYearId`) REFERENCES `SessionYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
