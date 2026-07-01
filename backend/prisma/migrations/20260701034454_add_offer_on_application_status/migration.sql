-- AlterEnum
ALTER TYPE "ApplicationStatus" ADD VALUE 'OFFER';

-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "expectedSalary" TEXT;
