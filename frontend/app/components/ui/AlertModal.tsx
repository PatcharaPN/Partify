import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

type AlertVariant = "error" | "warning" | "info" | "success";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  variant?: AlertVariant;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

const VARIANT_CONFIG = {
  error: {
    icon: "mdi:alert-circle-outline",
    iconClass: "text-red-500",
    bgClass: "bg-red-50",
    confirmClass: "bg-red-500 text-white hover:bg-red-600",
  },
  warning: {
    icon: "mdi:alert-outline",
    iconClass: "text-amber-500",
    bgClass: "bg-amber-50",
    confirmClass: "bg-amber-500 text-white hover:bg-amber-600",
  },
  info: {
    icon: "mdi:information-outline",
    iconClass: "text-blue-500",
    bgClass: "bg-blue-50",
    confirmClass: "bg-blue-500 text-white hover:bg-blue-600",
  },
  success: {
    icon: "mdi:check-circle-outline",
    iconClass: "text-green-500",
    bgClass: "bg-green-50",
    confirmClass: "bg-green-500 text-white hover:bg-green-600",
  },
};

export default function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  variant = "error",
  title,
  description,
  confirmLabel = "ตกลง",
  cancelLabel = "ยกเลิก",
}: AlertModalProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-sm mx-4 shadow-xl"
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <Icon icon="mdi:close" width="18" />
            </button>

            {/* Icon + Title */}
            <div className="flex flex-col items-center text-center gap-3 mb-4">
              <motion.div
                className={`w-12 h-12 ${config.bgClass} rounded-2xl flex items-center justify-center`}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05, type: "spring", bounce: 0.4 }}
              >
                <Icon
                  icon={config.icon}
                  width="26"
                  className={config.iconClass}
                />
              </motion.div>
              <p className="text-sm font-semibold text-gray-900">{title}</p>
            </div>

            <div className="h-px bg-gray-100 mb-4" />

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed text-center mb-5">
              {description}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 text-xs px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors font-medium"
              >
                {cancelLabel}
              </button>
              {onConfirm && (
                <button
                  onClick={onConfirm}
                  className={`flex-1 text-xs px-4 py-2.5 rounded-xl font-medium transition-colors ${config.confirmClass}`}
                >
                  {confirmLabel}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
