/*
  Warnings:

  - You are about to drop the column `companyImageURL` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `jobs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_companyId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_companyId_fkey";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "companyImageURL",
DROP COLUMN "companyName";

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyImageURL" TEXT,
    "companyBio" TEXT,
    "companySize" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_userId_key" ON "companies"("userId");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
