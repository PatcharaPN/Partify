-- AlterTable
ALTER TABLE "applications" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "updatedAt" DROP DEFAULT;
