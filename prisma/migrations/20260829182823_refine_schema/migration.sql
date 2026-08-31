/*
  Warnings:

  - You are about to drop the column `profileId` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the `ExperienceProject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `experienceId` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExperienceProject" DROP CONSTRAINT "ExperienceProject_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_profileId_fkey";

-- DropIndex
DROP INDEX "Testimonial_profileId_idx";

-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "profileId" TEXT;

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "profileId",
ADD COLUMN     "experienceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ExperienceProject";

-- CreateIndex
CREATE INDEX "Testimonial_experienceId_idx" ON "Testimonial"("experienceId");

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
