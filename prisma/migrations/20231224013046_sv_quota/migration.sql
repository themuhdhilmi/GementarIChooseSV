-- AlterTable
ALTER TABLE `lecturerinformation` ADD COLUMN `supervisorQuota` INTEGER NULL;

-- AlterTable
ALTER TABLE `sessionyear` ADD COLUMN `globalSupervisorQuota` INTEGER NOT NULL DEFAULT 3;
