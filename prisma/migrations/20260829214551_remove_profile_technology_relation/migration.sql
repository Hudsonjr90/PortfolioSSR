/*
  Warnings:

  - You are about to drop the column `profileId` on the `Technology` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_profileId_fkey";

-- AlterTable
ALTER TABLE "Technology" DROP COLUMN "profileId";
