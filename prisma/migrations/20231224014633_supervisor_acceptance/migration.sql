-- AlterTable
ALTER TABLE `studentinformation` ADD COLUMN `lecturerAcceptedStudent` ENUM('NONE', 'REQUESTED', 'ACCEPTED', 'DECLINED') NOT NULL DEFAULT 'NONE';
