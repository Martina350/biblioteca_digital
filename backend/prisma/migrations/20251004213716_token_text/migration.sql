/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `TokenRevocado` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `TokenRevocado_token_key` ON `TokenRevocado`;

-- AlterTable
ALTER TABLE `TokenRevocado` MODIFY `token` TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TokenRevocado_token_key` ON `TokenRevocado`(`token`(191));
