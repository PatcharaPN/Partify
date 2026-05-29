/*
  Warnings:

  - A unique constraint covering the columns `[createdBy]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_createdBy_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "companies_createdBy_key" ON "companies"("createdBy");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
