-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('ADMIN', 'LECTURER', 'STUDENT') NOT NULL DEFAULT 'STUDENT',
    ADD COLUMN `studentInformationId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `SessionYear` (
    `id` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `yearOne` INTEGER NOT NULL,
    `yearTwo` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GlobalIdentifier` (
    `id` VARCHAR(191) NOT NULL,
    `memberQuota` INTEGER NOT NULL DEFAULT 4,
    `titleQuota` INTEGER NOT NULL DEFAULT 3,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LecturerInformation` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentInformation` (
    `id` VARCHAR(191) NOT NULL,
    `matricNumber` VARCHAR(191) NOT NULL,
    `memberQuota` INTEGER NULL,
    `titleQuota` INTEGER NULL,
    `sessionId` VARCHAR(191) NULL,
    `sessionYearId` VARCHAR(191) NULL,
    `lecturerInformationId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `matricNumber` VARCHAR(191) NOT NULL,
    `studentInformationId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectTitle` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `uploadedProposal` VARCHAR(191) NOT NULL,
    `uploadedAbstract` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_studentInformationId_fkey` FOREIGN KEY (`studentInformationId`) REFERENCES `StudentInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentInformation` ADD CONSTRAINT `StudentInformation_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentInformation` ADD CONSTRAINT `StudentInformation_sessionYearId_fkey` FOREIGN KEY (`sessionYearId`) REFERENCES `SessionYear`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentInformation` ADD CONSTRAINT `StudentInformation_lecturerInformationId_fkey` FOREIGN KEY (`lecturerInformationId`) REFERENCES `LecturerInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_studentInformationId_fkey` FOREIGN KEY (`studentInformationId`) REFERENCES `StudentInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
