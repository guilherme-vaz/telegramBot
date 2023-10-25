/*
  Warnings:

  - The primary key for the `logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `logs` table. All the data in the column will be lost.
  - You are about to alter the column `chatId` on the `logs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `logs` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `chatId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`chatId`);
