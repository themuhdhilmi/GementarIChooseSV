/*
  Warnings:

  - You are about to drop the `globalidentifier` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[matricNumber]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matricNumber]` on the table `StudentInformation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `sessionyear` ADD COLUMN `globalMemberQuota` INTEGER NOT NULL DEFAULT 4,
    ADD COLUMN `globalTitleQuota` INTEGER NOT NULL DEFAULT 3;

-- DropTable
DROP TABLE `globalidentifier`;

-- CreateIndex
CREATE UNIQUE INDEX `Member_matricNumber_key` ON `Member`(`matricNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `StudentInformation_matricNumber_key` ON `StudentInformation`(`matricNumber`);
