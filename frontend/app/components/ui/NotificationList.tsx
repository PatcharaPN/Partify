import { useCompany } from "@/app/hooks/useCompany";
import { Notification } from "@/app/types/job.type";
import { formatTimeAgo } from "@/app/utils/FormatTimeAgo";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

type NotificationListProps = {
  notification: Notification;
  onClose?: () => void;
  onReadOne?: (id: string) => void;
  onAccept?: (inviteId: string) => void;
  onDecline?: (inviteId: string) => void;
};

const NotificationList = ({
  notification,
  onReadOne,
  onClose,
  onAccept,
  onDecline,
}: NotificationListProps) => {
  console.log(notification);

  return (
    <Link
      key={notification.id}
      onClick={() => {
        onReadOne?.(notification.id);
        onClose;
      }}
      href={`/jobs/${notification.job?.id}`}
    >
      <div
        className={`my-2 rounded-lg flex gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer ${
          !notification.isRead ? "bg-blue-50" : ""
        }`}
      >
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 overflow-hidden shrink-0">
          {notification.job?.company.companyImageURL ? (
            <img
              src={notification.job.company.companyImageURL}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex justify-items-center items-center ">
              <Icon
                icon={`iconamoon:notification`}
                width={20}
                opacity={"50%"}
              />
            </div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-800 line-clamp-3">
            {notification.message}
          </p>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-400">
              {formatTimeAgo(notification.createdAt)}
            </span>

            {!notification.isRead && (
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </div>
          {notification.type === "PENDING" && notification.inviteId && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onAccept?.(notification.inviteId ?? "");
                }}
                className="text-xs px-3 py-1 bg-blue-600 text-white rounded-lg"
              >
                ตอบรับ
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDecline?.(notification.inviteId ?? "");
                }}
                className="text-xs px-3 py-1 border border-gray-200 text-gray-500 rounded-lg"
              >
                ปฏิเสธ
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NotificationList;
