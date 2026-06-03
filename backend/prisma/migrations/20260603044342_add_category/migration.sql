/*
  Warnings:

  - The values [PENDING,ACCEPTED,REJECTED,INTERVIEW,INVITE] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "NotificationCategory" AS ENUM ('TEAM', 'RECRUITMENT', 'JOB', 'SYSTEM');

-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('TEAM_INVITE_RECEIVED', 'TEAM_INVITE_ACCEPTED', 'TEAM_INVITE_DECLINED', 'JOB_APPLICATION_RECEIVED', 'JOB_APPLICATION_ACCEPTED', 'JOB_APPLICATION_REJECTED', 'INTERVIEW_SCHEDULED', 'MEMBER_ADDED', 'MEMBER_REMOVED', 'MEMBER_ROLE_CHANGED', 'SYSTEM');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "category" "NotificationCategory";
