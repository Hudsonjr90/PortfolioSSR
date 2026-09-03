-- CreateEnum
CREATE TYPE "TechnologyLevel" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'ESPECIALIST');

-- AlterTable
ALTER TABLE "Technology" ADD COLUMN "level" "TechnologyLevel" NOT NULL DEFAULT 'INTERMEDIATE';
