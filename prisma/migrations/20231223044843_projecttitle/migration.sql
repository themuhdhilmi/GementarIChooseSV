/*
  Warnings:

  - You are about to drop the column `uploadedAbstract` on the `projecttitle` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedProposal` on the `projecttitle` table. All the data in the column will be lost.
  - Added the required column `uploadedPoster` to the `ProjectTitle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projecttitle` DROP COLUMN `uploadedAbstract`,
    DROP COLUMN `uploadedProposal`,
    ADD COLUMN `studentInformationId` VARCHAR(191) NULL,
    ADD COLUMN `uploadedPoster` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ProjectTitle` ADD CONSTRAINT `ProjectTitle_studentInformationId_fkey` FOREIGN KEY (`studentInformationId`) REFERENCES `StudentInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
