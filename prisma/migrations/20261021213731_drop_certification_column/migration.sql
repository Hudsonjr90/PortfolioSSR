/*
  Warnings:

  - You are about to drop the `Certification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_profileId_fkey";

-- DropTable
DROP TABLE "Certification";
