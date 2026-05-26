/*
  Warnings:

  - The `jobType` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FREELANCE', 'PARTTIME', 'FULLTIME', 'CONTRACT');

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "isActive" BOOLEAN,
DROP COLUMN "jobType",
ADD COLUMN     "jobType" "JobType";
