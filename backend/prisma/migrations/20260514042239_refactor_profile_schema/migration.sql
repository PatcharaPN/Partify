/*
  Warnings:

  - You are about to drop the column `name` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "job_skills" DROP CONSTRAINT "job_skills_jobId_fkey";

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "skills" TEXT[];

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "name",
ADD COLUMN     "district" TEXT,
ADD COLUMN     "expectedSalary" INTEGER,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "preferredCategories" TEXT[],
ADD COLUMN     "preferredJobTypes" TEXT[],
ADD COLUMN     "province" TEXT;
