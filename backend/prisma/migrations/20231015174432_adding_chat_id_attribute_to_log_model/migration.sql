/*
  Warnings:

  - Added the required column `chatId` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `logs` ADD COLUMN `chatId` VARCHAR(191) NOT NULL;
