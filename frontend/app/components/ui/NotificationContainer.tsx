import { Notification } from "@/app/types/job.type";
import { formatTimeAgo } from "@/app/utils/FormatTimeAgo";
import { motion } from "framer-motion";
import Link from "next/link";
import NotificationList from "./NotificationList";

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
          <NotificationList
            key={noti.id}
            notification={noti}
            onClose={onClose}
            onReadOne={onReadOne}
          />
        ))}
      </div>

      <div className="text-center text-sm py-2 border-t border-black/10 hover:bg-gray-50 cursor-pointer">
        ดูทั้งหมด
      </div>
    </motion.div>
  );
};

export default NotificationContainer;
