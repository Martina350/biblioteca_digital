/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Libro` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Libro` DROP FOREIGN KEY `Libro_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Libro_usuarioId_fkey` ON `Libro`;

-- AlterTable
ALTER TABLE `Libro` DROP COLUMN `usuarioId`;
