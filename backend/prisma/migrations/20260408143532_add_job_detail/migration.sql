/*
  Warnings:

  - You are about to drop the column `salary` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "salary",
ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "closingDate" TIMESTAMP(3),
ADD COLUMN     "currency" TEXT DEFAULT 'THB',
ADD COLUMN     "educationLevel" TEXT,
ADD COLUMN     "experienceLevel" TEXT,
ADD COLUMN     "experienceYears" INTEGER,
ADD COLUMN     "jobType" TEXT,
ADD COLUMN     "positions" INTEGER DEFAULT 1,
ADD COLUMN     "qualifications" TEXT,
ADD COLUMN     "responsibilities" TEXT,
ADD COLUMN     "salaryMax" INTEGER,
ADD COLUMN     "salaryMin" INTEGER,
ADD COLUMN     "salaryNegotiable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "urgency" TEXT,
ADD COLUMN     "workStyle" TEXT;

-- CreateTable
CREATE TABLE "job_skills" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "job_skills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
