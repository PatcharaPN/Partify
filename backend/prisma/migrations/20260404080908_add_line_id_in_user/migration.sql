/*
  Warnings:

  - A unique constraint covering the columns `[lineId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lineId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_lineId_key" ON "users"("lineId");
