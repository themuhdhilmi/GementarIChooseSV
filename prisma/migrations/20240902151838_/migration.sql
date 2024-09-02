-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `providerType` VARCHAR(191) NOT NULL,
    `providerId` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NULL,
    `accessToken` VARCHAR(191) NULL,
    `accessTokenExpires` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_providerId_providerAccountId_key`(`providerId`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    UNIQUE INDEX `Session_accessToken_key`(`accessToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `hashedPassword` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('ADMIN', 'LECTURER', 'STUDENT') NOT NULL DEFAULT 'STUDENT',
    `hasChangeOneTimePassword` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationRequest` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationRequest_token_key`(`token`),
    UNIQUE INDEX `VerificationRequest_identifier_token_key`(`identifier`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SessionYear` (
    `id` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `yearOne` INTEGER NOT NULL,
    `yearTwo` INTEGER NOT NULL,
    `globalMemberQuota` INTEGER NOT NULL DEFAULT 4,
    `globalTitleQuota` INTEGER NOT NULL DEFAULT 3,
    `globalSupervisorQuota` INTEGER NOT NULL DEFAULT 3,
    `finalPresentationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `feed` MEDIUMTEXT NULL,
    `isSelected` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LecturerInformation` (
    `id` VARCHAR(191) NOT NULL,
    `supervisorQuota` INTEGER NULL,
    `googleID` VARCHAR(191) NULL,
    `wosID` VARCHAR(191) NULL,
    `scopusID` VARCHAR(191) NULL,
    `expertise` VARCHAR(191) NULL,
    `Track` ENUM('SOFTWARE', 'NETWORK', 'SECURITY') NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LecturerInformation_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LecturerBiographyInfo` (
    `id` VARCHAR(191) NOT NULL,
    `LecturerBiographyInfoType` ENUM('RESEARCH', 'ARTICLE', 'CONSULTATION', 'AWARD_RECOGNITION', 'PROCEEDING', 'OTHERS', 'SUPERVISION') NOT NULL,
    `mainText` VARCHAR(191) NOT NULL DEFAULT '',
    `subText` VARCHAR(191) NULL,
    `lecturerInformationId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LecturerBiographyInfoTag` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `LecturerBiographyInfoTagColor` ENUM('RED', 'LEADER', 'GREEN', 'BLUE', 'YELLOW') NOT NULL,
    `lecturerBiographyInfoId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentInformation` (
    `id` VARCHAR(191) NOT NULL,
    `matricNumber` VARCHAR(191) NOT NULL,
    `memberQuota` INTEGER NULL,
    `titleQuota` INTEGER NULL,
    `userId` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NULL,
    `sessionYearId` VARCHAR(191) NOT NULL,
    `lecturerInformationId` VARCHAR(191) NULL,
    `lecturerAcceptedStudent` ENUM('NONE', 'REQUESTED', 'ACCEPTED', 'DECLINED') NOT NULL DEFAULT 'NONE',
    `Track` ENUM('SOFTWARE', 'NETWORK', 'SECURITY') NOT NULL,

    UNIQUE INDEX `StudentInformation_matricNumber_key`(`matricNumber`),
    UNIQUE INDEX `StudentInformation_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `matricNumber` VARCHAR(191) NOT NULL,
    `studentInformationId` VARCHAR(191) NULL,

    UNIQUE INDEX `Member_matricNumber_key`(`matricNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProjectTitle` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `uploadedPoster` VARCHAR(191) NULL,
    `studentInformationId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_LecturerInformationToSessionYear` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_LecturerInformationToSessionYear_AB_unique`(`A`, `B`),
    INDEX `_LecturerInformationToSessionYear_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LecturerInformation` ADD CONSTRAINT `LecturerInformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LecturerBiographyInfo` ADD CONSTRAINT `LecturerBiographyInfo_lecturerInformationId_fkey` FOREIGN KEY (`lecturerInformationId`) REFERENCES `LecturerInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LecturerBiographyInfoTag` ADD CONSTRAINT `LecturerBiographyInfoTag_lecturerBiographyInfoId_fkey` FOREIGN KEY (`lecturerBiographyInfoId`) REFERENCES `LecturerBiographyInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentInformation` ADD CONSTRAINT `StudentInformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentInformation` ADD CONSTRAINT `StudentInformation_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentInformation` ADD CONSTRAINT `StudentInformation_sessionYearId_fkey` FOREIGN KEY (`sessionYearId`) REFERENCES `SessionYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentInformation` ADD CONSTRAINT `StudentInformation_lecturerInformationId_fkey` FOREIGN KEY (`lecturerInformationId`) REFERENCES `LecturerInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_studentInformationId_fkey` FOREIGN KEY (`studentInformationId`) REFERENCES `StudentInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectTitle` ADD CONSTRAINT `ProjectTitle_studentInformationId_fkey` FOREIGN KEY (`studentInformationId`) REFERENCES `StudentInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LecturerInformationToSessionYear` ADD CONSTRAINT `_LecturerInformationToSessionYear_A_fkey` FOREIGN KEY (`A`) REFERENCES `LecturerInformation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LecturerInformationToSessionYear` ADD CONSTRAINT `_LecturerInformationToSessionYear_B_fkey` FOREIGN KEY (`B`) REFERENCES `SessionYear`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
