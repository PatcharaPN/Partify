/*
  Warnings:

  - You are about to drop the `job_skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "job_skills";

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
