-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "workingDays" TEXT,
ADD COLUMN     "workingHours" TEXT;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3);
