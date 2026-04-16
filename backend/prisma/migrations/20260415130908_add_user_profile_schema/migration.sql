/*
  Warnings:

  - The `skills` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `lineId` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_lineId_key";

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "availability" TEXT[],
ADD COLUMN     "shifts" TEXT[],
ADD COLUMN     "summary" TEXT,
DROP COLUMN "skills",
ADD COLUMN     "skills" TEXT[];

-- AlterTable
ALTER TABLE "users" DROP COLUMN "lineId";
