-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "inviteId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "company_invites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
