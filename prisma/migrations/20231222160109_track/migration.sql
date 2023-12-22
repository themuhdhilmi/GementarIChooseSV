/*
  Warnings:

  - You are about to drop the column `sessionYearId` on the `lecturerinformation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `lecturerinformation` DROP FOREIGN KEY `LecturerInformation_sessionYearId_fkey`;

-- AlterTable
ALTER TABLE `lecturerinformation` DROP COLUMN `sessionYearId`;

-- CreateTable
CREATE TABLE `_LecturerInformationToSessionYear` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_LecturerInformationToSessionYear_AB_unique`(`A`, `B`),
    INDEX `_LecturerInformationToSessionYear_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LecturerInformationToSessionYear` ADD CONSTRAINT `_LecturerInformationToSessionYear_A_fkey` FOREIGN KEY (`A`) REFERENCES `LecturerInformation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LecturerInformationToSessionYear` ADD CONSTRAINT `_LecturerInformationToSessionYear_B_fkey` FOREIGN KEY (`B`) REFERENCES `SessionYear`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
