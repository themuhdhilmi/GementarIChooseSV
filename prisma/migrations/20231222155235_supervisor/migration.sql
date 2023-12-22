/*
  Warnings:

  - Added the required column `Track` to the `LecturerInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Track` to the `StudentInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lecturerinformation` ADD COLUMN `Track` ENUM('SOFTWARE', 'NETWORK', 'SECURITY') NOT NULL,
    ADD COLUMN `sessionYearId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `studentinformation` ADD COLUMN `Track` ENUM('SOFTWARE', 'NETWORK', 'SECURITY') NOT NULL;

-- AddForeignKey
ALTER TABLE `LecturerInformation` ADD CONSTRAINT `LecturerInformation_sessionYearId_fkey` FOREIGN KEY (`sessionYearId`) REFERENCES `SessionYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
