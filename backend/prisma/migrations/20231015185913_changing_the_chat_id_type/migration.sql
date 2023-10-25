/*
  Warnings:

  - The primary key for the `logs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `logs` DROP PRIMARY KEY,
    MODIFY `chatId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`chatId`);
