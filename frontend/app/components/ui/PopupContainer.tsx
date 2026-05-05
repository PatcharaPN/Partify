import React from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { PopupState } from "@/app/types/ui.type";

interface PopupContainerProps {
  state: PopupState;
  onClose?: () => void;
}

const CONFIG = {
  loading: {
    icon: (
      <Icon
        icon="svg-spinners:ring-resize"
        className="text-blue-600"
        width="40"
        height="40"
      />
    ),
    title: "กำลังดำเนินการ...",
    subtitle: "กรุณารอสักครู่",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  success: {
    icon: (
      <Icon
        icon="material-symbols:check-circle-rounded"
        className="text-emerald-500"
        width="40"
        height="40"
      />
    ),
    title: "สำเร็จ!",
    subtitle: "รับเข้าทำงานเรียบร้อยแล้ว",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  error: {
    icon: (
      <Icon
        icon="material-symbols:cancel-rounded"
        className="text-red-500"
        width="40"
        height="40"
      />
    ),
    title: "เกิดข้อผิดพลาด",
    subtitle: "กรุณาลองใหม่อีกครั้ง",
    color: "text-red-600",
    bg: "bg-red-50",
  },
};

const PopupContainer = ({ state, onClose }: PopupContainerProps) => {
  if (!state) return null;
  const cfg = CONFIG[state];

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              delay: 0.1,
            }}
            className={`w-16 h-16 rounded-2xl ${cfg.bg} flex items-center justify-center`}
          >
            {cfg.icon}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-center"
          >
            <p className={`text-lg font-bold ${cfg.color}`}>{cfg.title}</p>
            <p className="text-sm text-gray-400 mt-1">{cfg.subtitle}</p>
          </motion.div>

          {state === "error" && onClose && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="mt-2 px-6 py-2 bg-red-50 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-100 transition-all cursor-pointer"
            >
              ปิด
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupContainer;
