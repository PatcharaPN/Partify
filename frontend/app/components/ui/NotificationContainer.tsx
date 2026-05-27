import { Notification } from "@/app/types/job.type";
import { formatTimeAgo } from "@/app/utils/FormatTimeAgo";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  notifications?: Notification[];
  onClose: () => void;
  onReadAll: () => void;
  onReadOne: (id: string) => void;
};

const NotificationContainer = ({
  onReadOne,
  onReadAll,
  notifications = [],
  onClose,
}: Props) => {
  return (
    <motion.div
      className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-2xl border border-gray-100 z-50 overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
        <p className="font-semibold text-gray-800">การแจ้งเตือน</p>
        <button
          onClick={onReadAll}
          className="text-xs text-blue-500 hover:underline"
        >
          อ่านทั้งหมด
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 && (
          <div className="p-4 text-sm text-gray-500 text-center">
            ไม่มีการแจ้งเตือน
          </div>
        )}

        {notifications.map((noti) => (
          <Link
            key={noti.id}
            onClick={() => {
              onReadOne(noti.id);
              onClose;
            }}
            href={`/jobs/${noti.job?.id}`}
          >
            <div
              className={`flex gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                !noti.isRead ? "bg-blue-50" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                {noti.job?.company.companyImageURL ? (
                  <img
                    src={noti.job.company.companyImageURL}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-800 line-clamp-3">
                  {noti.message}
                </p>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">
                    {formatTimeAgo(noti.createdAt)}
                  </span>

                  {!noti.isRead && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center text-sm py-2 border-t border-black/10 hover:bg-gray-50 cursor-pointer">
        ดูทั้งหมด
      </div>
    </motion.div>
  );
};

export default NotificationContainer;
