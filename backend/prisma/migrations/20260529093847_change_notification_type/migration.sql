CREATE TYPE "NotificationType" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'INTERVIEW', 'INVITE');

-- cast column เดิมไปเป็น type ใหม่
ALTER TABLE "Notification" 
ALTER COLUMN "type" TYPE "NotificationType" 
USING "type"::text::"NotificationType";
