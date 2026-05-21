import { Icon } from "@iconify/react";

type AlertVariant = "error" | "warning" | "info";

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
    confirmClass: "bg-primary text-white hover:bg-gray-700",
  },
  warning: {
    icon: "mdi:alert-outline",
    iconClass: "text-amber-500",
    bgClass: "bg-amber-50",
    confirmClass: "bg-red-500 text-white hover:bg-red-600",
  },
  info: {
    icon: "mdi:information-outline",
    iconClass: "text-blue-500",
    bgClass: "bg-blue-50",
    confirmClass: "bg-primary text-white hover:bg-gray-700",
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
  if (!isOpen) return null;

  const config = VARIANT_CONFIG[variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 ${config.bgClass} rounded-xl flex items-center justify-center shrink-0`}
            >
              <Icon
                icon={config.icon}
                width="20"
                className={config.iconClass}
              />
            </div>
            <p className="text-sm font-medium text-gray-900">{title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-500"
          >
            <Icon icon="mdi:close" width="18" />
          </button>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed mb-5 ml-12">
          {description}
        </p>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="text-xs px-4 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={`text-xs px-4 py-2 rounded-xl font-medium transition-colors ${config.confirmClass}`}
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
