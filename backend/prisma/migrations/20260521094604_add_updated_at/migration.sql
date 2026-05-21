/*
  Warnings:

  - Added the required column `updatedAt` to the `applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applications" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();
ALTER TABLE "jobs" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();
ALTER TABLE "profiles" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();